import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { YandexMapService } from '../../../services/yandex-map.service';
import {ICuePointCard} from '../../../dto/ICuePointCard';
import {IBaseRouteCuePoint} from '../../../data/cuePoint/CuePoint';

export interface IPoint {
  latitude: number,
  longitude: number
  address: string
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {
  @Input() canSelectPoint: boolean = false;

  mapPoints: [number, number][] = [];
  private map: any;
  private clickListenerRef: any;
  private currentPointMarker: any = null;

  @Output()
  onOutputPoint = new EventEmitter<IPoint>();
  @Input() routePoints: IBaseRouteCuePoint[] = [];

  constructor(
    public yandexMapService: YandexMapService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.removeClickListener();
      this.map.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['canSelectPoint']) {
      if (this.map) {
        this.updateClickListener();
      }

      if (!this.canSelectPoint && this.currentPointMarker) {
        this.map.geoObjects.remove(this.currentPointMarker);
        this.currentPointMarker = null;
      }
    }
    if (changes['routePoints'] && this.map) {
      this.renderRoutePoints();
    }
  }

  initializeMap() {
    this.yandexMapService.initializeMap("mapContainer", this.mapPoints).then((map: any) => {
      this.map = map;
      this.updateClickListener();
    });
  }

  updateClickListener() {
    this.removeClickListener();

    this.clickListenerRef = (coords: [number, number], address: string) => {
      if (!this.canSelectPoint) return;

      // Удалить предыдущую точку, если есть
      if (this.currentPointMarker) {
        this.map.geoObjects.remove(this.currentPointMarker);
      }

      // Добавить новую точку
      this.currentPointMarker = new (window as any)['ymaps'].Placemark(coords);
      this.map.geoObjects.add(this.currentPointMarker);

      console.log("Выбраны координаты:", coords);
      console.log("Адрес:", address);
      this.onOutputPoint.emit({
        latitude: coords[0],
        longitude: coords[1],
        address: address
      });
    };

    this.yandexMapService.setClickListener(this.map, this.clickListenerRef);
  }

  removeClickListener() {
    if (this.clickListenerRef) {
      this.yandexMapService.removeClickListener(this.map, this.clickListenerRef);
      this.clickListenerRef = null;
    }
  }

  renderRoutePoints() {
    if (!this.routePoints || this.routePoints.length === 0) return;

    // Отсортируем по sortIndex
    const sortedPoints = [...this.routePoints].sort((a, b) => a.sortIndex - b.sortIndex);
    const coords = sortedPoints.map(p => [p.latitude, p.longitude] as [number, number]);

    this.yandexMapService.addRoutePointsToMap(this.map, coords);
  }

  addPointToMap(point: [number, number]) {
    if (this.currentPointMarker) {
      this.map.geoObjects.remove(this.currentPointMarker);
    }

    this.currentPointMarker = new (window as any)['ymaps'].Placemark(point);
    this.map.geoObjects.add(this.currentPointMarker);
  }

  addPointsToMap(points: [number, number][]) {
    for (const point of points) {
      const placemark = new (window as any)['ymaps'].Placemark(point);
      this.map.geoObjects.add(placemark);
    }
  }
}
