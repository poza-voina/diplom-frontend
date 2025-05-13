import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {MapComponent} from '../../../base/map/map.component';
import {NgForOf, NgIf} from '@angular/common';
import {AdminModule} from '../admin.module';
import {CuePointCard, ICuePointCard} from '../../../../dto/ICuePointCard';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteService} from '../../../../services/route.service';
import {map} from 'rxjs';
import {AdminActionsService} from '../../../../services/admin-actions.service';
import {RouteCuePointItem} from '../../../../data/cuePoint/CuePoint';

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
  isSavingCuePoints: boolean = false;
  @ViewChild(MapComponent) mapElement!: MapComponent;
  showScrollButton: boolean = false;
  canSelectPoint: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
    private adminActionsService: AdminActionsService,
    private cdr: ChangeDetectorRef,
    private router: Router) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit(): void {
    this.loadCuePoints();
  }

  ngAfterViewInit(): void {
    this.isMapAvailable = true;
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
        map(x => x.map(y => new CuePointCard({CuePointCard: y, isHovered: false, sortIndex: y.sortIndex}))))
      .subscribe(
        {
          next: cuePointsCards => {
            this.cuePointCards = cuePointsCards;
            this.cuePointCards = this.updateCuePointsPositions();
          },
          error: cuePointsCards => {
          },
          complete: () => {
            this.mapElement.addPointsToMap(this.extractCoordsWithAddresses())
          }
        }
      );
  }

  updateCuePointsPositions() {
    return this.cuePointCards.sort((a, b) => a.sortIndex - b.sortIndex);
  }

  updateIndex(currentIndex: number, newIndex: number) {
    if (currentIndex < newIndex) {
      this.moveDown(currentIndex, newIndex);
    } else if (currentIndex > newIndex) {
      this.moveUp(currentIndex, newIndex);
    }

    this.cuePointCards = this.updateCuePointsPositions();
    this.cdr.detectChanges();
  }

  moveLower(index: number) {
    this.updateIndex(index, index + 1);
  }

  moveHigher(index: number) {
    this.updateIndex(index, index - 1);
  }

  insertCard(parentCard: ICuePointCard, card: ICuePointCard) {
    for (let item of this.cuePointCards) {
      if (item.sortIndex > parentCard.sortIndex) {
        item.sortIndex++;
      }
    }

    card.sortIndex = parentCard.sortIndex + 1;
    this.cuePointCards.push(card);
    this.cuePointCards = this.updateCuePointsPositions();
    this.cdr.detectChanges();
  }

  handleCuePointCardEnterToggle(cuePointCard: ICuePointCard) {
    cuePointCard.isHovered = !cuePointCard.isHovered;
  }

  handleAddNewCard(parentCard: ICuePointCard | null = null): void {
    let cuePointCard = new CuePointCard({
      isHovered: false,
      sortIndex: -1,
      CuePointCard: RouteCuePointItem.createEmpty()
    });
    if (!parentCard) {
      this.cuePointCards.push(cuePointCard);
    } else {
      this.insertCard(parentCard, cuePointCard);
    }
  }

  saveRoute() {
    this.isSavingCuePoints = true;
    let cuePointItems = this.cuePointCards
      .filter(x => x.cuePointItem)
      .map(x => {
        let cuePointItem = x.cuePointItem!;
        cuePointItem.sortIndex = x.sortIndex;
        cuePointItem.routeId = this.routeId;
        return cuePointItem;
      });
    this.adminActionsService.updateRouteCuePoints(cuePointItems).subscribe({
      error: cuePointItems => {
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

  goToRoute(): void {
    this.router.navigate(['/admin/route', this.routeId]);
  }

  private removeBySortIndex(sortIndex: number) {
    this.cuePointCards = this.cuePointCards.filter(x => x.sortIndex !== sortIndex);

    for (let item of this.cuePointCards) {
      item.sortIndex--;
    }
  }

  private moveUp(currentIndex: number, newIndex: number) {
    if (currentIndex == newIndex || newIndex < 0) {
      return;
    }

    for (let item of this.cuePointCards) {
      if (item.sortIndex === currentIndex) {
        item.sortIndex = newIndex;
      } else if (item.sortIndex < this.cuePointCards.length - 1 && item.sortIndex >= newIndex && item.sortIndex <= currentIndex) {
        item.sortIndex++;
      }
    }
  }

  private moveDown(currentIndex: number, newIndex: number) {
    if (currentIndex == newIndex || newIndex >= this.cuePointCards.length) {
      return;
    }
    for (let item of this.cuePointCards) {
      if (item.sortIndex == currentIndex) {
        item.sortIndex = newIndex;
      } else if (item.sortIndex >= 1 && item.sortIndex >= currentIndex && item.sortIndex <= newIndex) {
        item.sortIndex--;
      }
    }
  }

  handlePickedPoint(canSelectPoint: boolean) {
    this.canSelectPoint = canSelectPoint;
  }
}

