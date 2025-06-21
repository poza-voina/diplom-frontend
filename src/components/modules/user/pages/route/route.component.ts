import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import {DatePipe, NgForOf, NgIf, NgSwitch} from '@angular/common';
import {CalendarComponent} from '../../components/calendar/calendar.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RouteService} from '../../../../../services/route.service';
import {IRouteExample} from '../../../../../data/IRouteExample';
import {ISelectMonth} from '../../../../../dto/i-select.month';
import {ClientAuthService} from '../../service/client-auth.service';
import {ClientActionsService} from '../../../../../services/client-actions.service';
import {IRouteExampleRecord} from '../../../../../data/IRouteExampleRecord';
import {IGetBooksRequestByDateRange} from '../../../../../data/book/IGetBooksRequestByDateRange';
import {RouteHelper} from '../../../../../services/route.helper';
import {IRouteCuePointWithAttachment} from '../../../../../data/cuePoint/CuePoint';
import {IRouteWithAttachment} from '../../../../../data/route/IBaseRoute';
import {S3Helper} from '../../../../../services/s3.helper';
import {MapComponent} from '../../../../base/map/map.component';
import {pipe} from 'rxjs';
import {Observable, forkJoin} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-route',
  imports: [
    FullCalendarModule,
    NgForOf,
    CalendarComponent,
    NgIf,
    DatePipe,
    RouterLink,
    NgSwitch,
    MapComponent
  ],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit {
  cuePoints: IRouteCuePointWithAttachment[] = [];
  routeItem: IRouteWithAttachment | null = null;
  routeId: number;
  selectMonth: ISelectMonth | null = null;
  routeExamplesByMonth: IRouteExample[] = [];
  viewRouteExampleItem: IRouteExample | null = null;
  viewRouteExampleRecord: IRouteExampleRecord | null = null;
  routeExampleRecords: IRouteExampleRecord[] = [];
  isMapInitialize: boolean = false;
  isCuePointsInitialize: boolean = false;
  @ViewChild(MapComponent) mapElement!: MapComponent;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild(CalendarComponent) calendarComponent!: CalendarComponent;

  constructor(private route: ActivatedRoute,
              private routeService: RouteService,
              private clientAuthService: ClientAuthService,
              private clientActionsService: ClientActionsService,
              private cdr: ChangeDetectorRef) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  get isBooked(): boolean {
    return this.viewRouteExampleRecord !== null;
  }

  get isAuth(): boolean {
    return this.clientAuthService.isAuthenticated();
  }

  get isButtonBookDisabled(): boolean {
    return this.viewRouteExampleItem === null || this.viewRouteExampleRecord !== null;
  }

  get remainingSeats(): number | null {
    if (this.routeItem?.maxCountPeople && this.viewRouteExampleItem) {
      return this.routeItem.maxCountPeople - this.viewRouteExampleItem.countRecords;
    }
    return null;
  }

  ngOnInit(): void {
    this.routeService.getRoute(this.routeId).subscribe(
      {
        next: route => {
          this.routeItem = route;
        },
        error: error => console.log("Не удалось загрузить маршрут")
      }
    )

    this.routeService.getRouteCuePoints(this.routeId).subscribe(
      {
        next: cuePoints => {
          this.cuePoints = cuePoints;
        },
        error: error => {
          console.log("Не удалось загрузить ключевые точки маршрута");
        },
        complete: () => {
          this.isCuePointsInitialize = true;
          this.renderCuePoints()
        }
      }
    )
  }

  onSelectMonth(selectMonth: ISelectMonth) {
    this.selectMonth = selectMonth;
    this.updateRouteExamplesAndRecordsByMonth().subscribe();
  }

  updateRouteExamplesAndRecordsByMonth(): Observable<any> {
    const examples$ = this.routeService.getRouteExamplesByMonth(this.selectMonth);
    const dateRange = this.getMonthDateRange(this.selectMonth);
    const records$ = this.clientActionsService.getBooks(dateRange);

    return forkJoin([examples$, records$]).pipe(
      tap(([examples, records]) => {
        this.routeExamplesByMonth = examples;
        this.routeExampleRecords = records;
      })
    );
  }

  getMonthDateRange({month, year}: ISelectMonth): IGetBooksRequestByDateRange {
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    return {startDate: start.toISOString(), endDate: end.toISOString()};
  }

  handleSelectDay(routeExampleItem: IRouteExample | null) {
    this.viewRouteExampleItem = routeExampleItem;
    this.routeService.getRouteExample(routeExampleItem.id).subscribe(
      {
        next: (x) => this.viewRouteExampleItem = x,
        error: err => console.log(err)
      },
    )

    this.changeRecord()
  }

  requestRouteExampleById() {
    this.routeService.getRouteExample(this.viewRouteExampleItem.id).subscribe(
      {
        next: (x) => this.viewRouteExampleItem = x,
        error: err => console.log(err)
      },
    )
  }

  book() {
    if (this.viewRouteExampleItem?.routeId) {
      this.clientActionsService.book(this.viewRouteExampleItem.id).subscribe({
        next: record => {
          // Сначала обновляем данные, после этого вызываем changeRecord()
          this.updateRouteExamplesAndRecordsByMonth().subscribe({
            next: () => {
              this.changeRecord();
              this.viewRouteExampleItem = this.routeExamplesByMonth.find(x => x.id == this.viewRouteExampleItem.id);
            },
            error: err => {
              console.error('Ошибка при обновлении данных:', err);
            }
          });
        },
        error: error => {
          console.log("Не удалось записаться на маршрут");
        },
        complete: () => {
          this.cdr.detectChanges();
        }
      });
    }
  }

  changeRecord() {
    if (this.viewRouteExampleItem !== null) {
      this.viewRouteExampleRecord = this.getRouteExampleRecord(this.viewRouteExampleItem!.id)
    } else {
      this.viewRouteExampleRecord = null;
    }
  }

  getRouteExampleRecord(id: number): IRouteExampleRecord {
    return this.routeExampleRecords.find(x => x.routeExampleId === id) ?? null;
  }

  unBook() {
    if (this.viewRouteExampleItem?.routeId) {
      this.clientActionsService.unBook(this.viewRouteExampleItem.id).subscribe(
        {
          next: record => {
            // Сначала обновляем данные, после этого вызываем changeRecord()
            this.updateRouteExamplesAndRecordsByMonth().subscribe({
              next: () => {
                this.changeRecord();
                this.viewRouteExampleItem = this.routeExamplesByMonth.find(x => x.id == this.viewRouteExampleItem.id);
              },
              error: err => {
                console.error('Ошибка при обновлении данных:', err);
              }
            });
          },
          error: error => {
            console.log("Не удалось записаться на маршрут");
          }
        }
      )
    }
  }

  getRecordStatus(status: string): string {
    return RouteHelper.ConvertRouteExampleRecordStatusToMessage(status);
  }

  getImageUrl(uri: string | null): string | null {
    console.log(`URI ${uri}`);

    if (uri === null) {
      return null;
    }
    console.log(`URI ${S3Helper.getImageUrlOrDefault(uri)}`);
    return S3Helper.getImageUrlOrDefault(uri);
  }

  handleMapInitialize() {
    this.isMapInitialize = true;
    this.renderCuePoints();
  }

  private renderCuePoints() {
    if (this.isMapInitialize && this.isCuePointsInitialize) {
      this.mapElement.renderRoutePoints();
    }
  }

  handleViewOnMap(sortIndex: number) {
    this.mapElement.centering(sortIndex)
    this.scrollToMap()
  }

  scrollToMap() {
    if (this.mapContainer) {
      const elementPosition = this.mapContainer.nativeElement.getBoundingClientRect().top + window.scrollY;
      const offset = 80;

      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }
}
