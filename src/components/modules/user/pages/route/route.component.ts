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
  routeExamplesByMonth: IRouteExample[] = [];
  viewRouteExampleItem: IRouteExample | null = null;
  viewRouteExampleRecord: IRouteExampleRecord | null = null;
  routeExampleRecords: IRouteExampleRecord[] = [];
  isMapInitialize: boolean = false;
  isCuePointsInitialize: boolean = false;
  @ViewChild(MapComponent) mapElement!: MapComponent;
  @ViewChild('mapContainer') mapContainer!: ElementRef;

  constructor(private route: ActivatedRoute,
              private routeService: RouteService,
              private clientAuthService: ClientAuthService,
              private clientActionsService: ClientActionsService,
              private cdr : ChangeDetectorRef) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  get isBooked(): boolean {
    return this.viewRouteExampleItem !== null;
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
    this.routeService.getRouteExamplesByMonth(selectMonth).subscribe(
      {
        next: (x) => this.routeExamplesByMonth = x,
        error: error => console.log("Не удалось получить екземляры для месяца")
      }
    )

    let dateRange = this.getMonthDateRange(selectMonth);
    try {
      this.clientActionsService.getBooks(dateRange).subscribe(
        {next: (x) => this.routeExampleRecords = x},
      )
    } catch (error) {}
  }

  getMonthDateRange({ month, year }: ISelectMonth): IGetBooksRequestByDateRange {
    const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
    const end = new Date(year, month, 0, 23, 59, 59, 999);

    return { startDate: start.toISOString(), endDate: end.toISOString() };
  }

  handleSelectDay(routeExampleItem: IRouteExample | null) {
    this.viewRouteExampleItem = routeExampleItem;
    this.changeRecord()
  }

  book() {
    if (this.viewRouteExampleItem?.routeId) {
      this.clientActionsService.book(this.viewRouteExampleItem.id).subscribe(
        {
          error: error => {
            console.log("Не удалось записаться на маршрут")
          }
        }
      )
    }
  }

  changeRecord() {
    if (this.viewRouteExampleItem !== null)
    {
      this.viewRouteExampleRecord = this.routeExampleRecords.find(x => x.routeExampleId === this.viewRouteExampleItem!.id) ?? null;
    } else {
      this.viewRouteExampleRecord = null;
    }
  }

  unBook() {

  }

  getRecordStatus(status: string) : string {
    return RouteHelper.ConvertRouteExampleRecordStatusToMessage(status);
  }

  getImageUrl(uri: string | null) : string | null {
    console.log(`URI ${uri}`);

    if (uri === null) {
      return null;
    }
    console.log(`URI ${ S3Helper.getImageUrlOrDefault(uri)}`);
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
