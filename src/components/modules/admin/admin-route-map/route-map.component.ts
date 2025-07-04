import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {IPoint, MapComponent} from '../../../base/map/map.component';
import {NgForOf, NgIf} from '@angular/common';
import {AdminModule} from '../admin.module';
import {CuePointCard, ICuePointCard} from '../../../../dto/ICuePointCard';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteService} from '../../../../services/route.service';
import {map} from 'rxjs';
import {AdminActionsService} from '../../../../services/admin-actions.service';
import {IBaseRouteCuePoint, RouteCuePointItem} from '../../../../data/cuePoint/CuePoint';
import {CuePointStatus} from '../../../../enums/cue-point.status';
import {AttachmentService} from '../../../../services/attachment.service';

@Component({
  selector: 'app-admin-route-map',
  imports: [
    MapComponent,
    NgForOf,
    NgIf,
    AdminModule
  ],
  templateUrl: './route-map.component.html',
  styleUrl: './route-map.component.css'
})
export class RouteMapComponent implements OnInit, AfterViewInit {
  cuePointCards: ICuePointCard[] = []
  routeId: number;
  isMapAvailable = false;
  isCuePointsAvailable = false;
  isSavingCuePoints: boolean = false;
  @ViewChild(MapComponent) mapElement!: MapComponent;
  showScrollButton: boolean = false;
  canSelectPoint: boolean = false;
  outputPoint: IPoint | null = null;
  cardIndex: number = -100;
  editedCard: ICuePointCard | null = null;
  routePoints: IBaseRouteCuePoint[] = [];

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
    private adminActionsService: AdminActionsService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private attachmentService: AttachmentService
  ) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit(): void {
    this.loadCuePoints();
  }

  ngAfterViewInit(): void {

  }

  get showAlert(): boolean {
    return this.cuePointCards?.some(card => !card?.cuePointItem?.title?.trim());
  }

  extractCoordsWithAddresses(): [number, number][] {
    var a = this.cuePointCards
      .filter(x => x.cuePointItem && x.cuePointItem.latitude && x.cuePointItem.longitude && x.cuePointItem.address)
    var b = a
      .map(x => [x.cuePointItem!.latitude as number, x.cuePointItem!.longitude as number] as [number, number]);
    console.log(b)
    return b;
  }

  loadCuePoints() {
    this.routeService.getRouteCuePoints(this.routeId)
      .pipe(
        map(x => x.map(y => new CuePointCard({
          cuePointItem: y,
          isHovered: false,
          cuePointStatus: CuePointStatus.None
        }))))
      .subscribe(
        {
          next: cuePointsCards => {
            this.cuePointCards = cuePointsCards;
            this.cuePointCards = this.updateCuePointsPositions();
          },
          error: cuePointsCards => {
          },
          complete: () => {
            this.isCuePointsAvailable = true;
            this.renderCuePoints();
          }
        }
      );
  }

  updateCuePointsPositions() {
    return this.cuePointCards.sort((a: ICuePointCard, b) => a.cuePointItem.sortIndex - b.cuePointItem.sortIndex);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key.toLowerCase() === 'h') {
      this.printSortIndexes();
    }
  }

  printSortIndexes() {
    const indexes = this.cuePointCards.map(point => point.cuePointItem.sortIndex);
    console.log(indexes);
  }

  updateIndex(currentIndex: number, newIndex: number) {
    if (currentIndex < newIndex) {
      this.moveDown(currentIndex, newIndex);
    } else if (currentIndex > newIndex) {
      this.moveUp(currentIndex, newIndex);
    }

    this.cuePointCards = this.updateCuePointsPositions();
    this.cdr.detectChanges();
    this.changeRoutePoints()
  }

  moveLower(index: number) {
    this.updateIndex(index, index + 1);
    this.changeRoutePoints()
  }

  moveHigher(index: number) {
    this.updateIndex(index, index - 1);
    this.changeRoutePoints()
  }

  changeRoutePoints() {
    const sortedCuePoints = this.cuePointCards
      .filter(card => !!card.cuePointItem) // исключаем undefined
      .sort((a, b) => a.cuePointItem.sortIndex - b.cuePointItem.sortIndex) // сортируем карточки по индексу
      .map(card => card.cuePointItem!);

    this.routePoints = sortedCuePoints;
    console.log(`CHANGEROUTEPOINTS`);
    console.log(this.routePoints);
  }

  insertCard(parentCard: ICuePointCard, card: ICuePointCard) {
    for (let item of this.cuePointCards) {
      if (item.cuePointItem.sortIndex > parentCard.cuePointItem.sortIndex) {
        item.cuePointItem.sortIndex++;
      }
    }

    card.cuePointItem.sortIndex = parentCard.cuePointItem.sortIndex + 1;
    this.cuePointCards.push(card);
    this.cuePointCards = this.updateCuePointsPositions();
    this.cdr.detectChanges();
  }

  handleCuePointCardEnterToggle(cuePointCard: ICuePointCard) {
    cuePointCard.isHovered = !cuePointCard.isHovered;
  }

  handleAddNewCard(parentCard: ICuePointCard | null | undefined = null): void {
    let cuePointItem = RouteCuePointItem.createEmpty();
    cuePointItem.sortIndex = -1;

    let cuePointCard = new CuePointCard({
      isHovered: false,
      cuePointItem: cuePointItem,
      cuePointStatus: CuePointStatus.None
    });
    if (!parentCard) {
      cuePointCard.cuePointItem.sortIndex = 0;
      this.cuePointCards.push(cuePointCard);
    } else {
      this.insertCard(parentCard, cuePointCard);
    }
  }

  saveRoute() {
    this.isSavingCuePoints = true;

    const cuePointItems = this.cuePointCards.map(x => {
      x.cuePointItem.routeId = this.routeId;
      return x.cuePointItem;
    });

    let ids: number[] = [];
    let files: File[] = [];

    this.adminActionsService.updateRouteCuePoints(cuePointItems, this.routeId).subscribe({
      next: items => {
        const ids: number[] = [];
        const files: File[] = [];

        items.forEach((item, index) => {
          const card = this.cuePointCards[index];
          if (card?.file) {
            ids.push(item.id!);
            files.push(card.file);
            console.log("asdf");
          }
        });

        console.log('CuePoints saved');
        console.log(files, ids);
        if (files.length > 0 && ids.length > 0) {
          this.attachmentService.uploadCuePointsAttachments(files, ids).subscribe({
            next: () => {
              console.log('Файлы успешно загружены');
            },
            error: err => {
              console.error('Ошибка при загрузке файлов', err);
            }
          });
        }
      },
      error: () => {
        console.warn("Не удалось сохранить ключевые точки маршрута");
        this.isSavingCuePoints = false;
      },
      complete: () => {
        this.isSavingCuePoints = false;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }

  scrollTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  private removeBySortIndex(sortIndex: number) {
    this.cuePointCards = this.cuePointCards.filter(x => x.cuePointItem.sortIndex !== sortIndex);

    for (let item of this.cuePointCards) {
      item.cuePointItem.sortIndex--;
    }
  }

  private moveUp(currentIndex: number, newIndex: number) {
    if (currentIndex == newIndex || newIndex < 0) {
      return;
    }

    for (let item of this.cuePointCards) {
      if (item.cuePointItem.sortIndex === currentIndex) {
        item.cuePointItem.sortIndex = newIndex;
      } else if (item.cuePointItem.sortIndex < this.cuePointCards.length - 1 && item.cuePointItem.sortIndex >= newIndex && item.cuePointItem.sortIndex <= currentIndex) {
        item.cuePointItem.sortIndex++;
      }
    }
  }

  private moveDown(currentIndex: number, newIndex: number) {
    if (currentIndex == newIndex || newIndex >= this.cuePointCards.length) {
      return;
    }
    for (let item of this.cuePointCards) {
      if (item.cuePointItem.sortIndex == currentIndex) {
        item.cuePointItem.sortIndex = newIndex;
      } else if (item.cuePointItem.sortIndex >= 1 && item.cuePointItem.sortIndex >= currentIndex && item.cuePointItem.sortIndex <= newIndex) {
        item.cuePointItem.sortIndex--;
      }
    }
  }

  handlePickedPoint(canSelectPoint: number | null) {
    console.log("handlePickedPoint");
    console.log(canSelectPoint);
    if (this.editedCard) {
      this.editedCard.status = CuePointStatus.None;
    }
    if (canSelectPoint == null) {
      this.canSelectPoint = false;
    } else {
      this.cardIndex = canSelectPoint;
      this.editedCard = this.cuePointCards.find(x => x.cuePointItem?.sortIndex == this.cardIndex) || null;
      if (this.editedCard) {
        this.editedCard.status = CuePointStatus.Editing;
      }
      this.canSelectPoint = true;
    }
  }

  handleOutputPoint(point: IPoint) {
    this.outputPoint = point;
    if (this.editedCard && this.editedCard.cuePointItem) {
      this.editedCard.cuePointItem.address = this.outputPoint.address;
      this.editedCard.cuePointItem.latitude = this.outputPoint.latitude;
      this.editedCard.cuePointItem.longitude = this.outputPoint.longitude;
    }

    this.changeRoutePoints()
  }

  handleMapInitialize() {
    this.mapElement.renderRoutePoints();
    this.isMapAvailable = true;
    this.renderCuePoints()
  }

  renderCuePoints() {
    if (this.isMapAvailable && this.isCuePointsAvailable) {
      this.changeRoutePoints();
      this.mapElement.renderRoutePoints();
    }
  }

  handleFileSelected(file: File, index: number) {
    this.cuePointCards[index].file = file;
  }

  handleRemove(sortIndex: number) {
    const index = this.cuePointCards.findIndex(x => x.cuePointItem.sortIndex === sortIndex);
    if (index >= 0) {
      this.cuePointCards.splice(index, 1);
    }
  }
}
