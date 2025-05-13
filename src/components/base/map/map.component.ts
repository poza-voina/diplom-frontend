// map.component.ts
import {Component, ElementRef, OnInit, OnDestroy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {YandexMapService} from '../../../services/yandex-map.service';
import {IBaseRouteCuePoint} from '../../../data/cuePoint/CuePoint';


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

  constructor(
    public yandexMapService: YandexMapService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.removeClickListener(); // обязательно удаляем
      this.map.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['canSelectPoint'] && this.map) {
      this.updateClickListener();
    }
  }

  initializeMap() {
    this.yandexMapService.initializeMap("mapContainer", this.mapPoints).then((map: any) => {
      this.map = map;
      this.updateClickListener();
    });
  }

  updateClickListener() {
    this.removeClickListener(); // снять старый, если был

    this.clickListenerRef = (coords: [number, number], address: string) => {
      if (!this.canSelectPoint) return;

      console.log("Выбраны координаты:", coords);
      console.log("Адрес:", address);
      this.yandexMapService.addPointToMap(this.map, coords);

      console.table([{
        Latitude: coords[0],
        Longitude: coords[1],
        Address: address
      }]);
    };

    this.yandexMapService.setClickListener(this.map, this.clickListenerRef);
  }

  removeClickListener() {
    if (this.clickListenerRef) {
      this.yandexMapService.removeClickListener(this.map, this.clickListenerRef);
      this.clickListenerRef = null;
    }
  }

  addPointToMap(point: [number, number]) {
    this.yandexMapService.addPointToMap(this.map, point);
  }

  addPointsToMap(points: [number, number][]) {
    this.yandexMapService.addPointsToMap(this.map, points);
  }
}
