// map.component.ts
import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import {YandexMapService} from '../../../services/yandex-map.service';
import {IBaseRouteCuePoint} from '../../../data/cuePoint/CuePoint';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  mapPoints: [number, number][] = [];
  private map: any;

  constructor(
    public yandexMapService: YandexMapService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.destroy();
    }
  }

  initializeMap() {
    this.yandexMapService.initializeMap("mapContainer", this.mapPoints).then((map: any) => {
      this.map = map;

      this.yandexMapService.setClickListener(this.map, (coords, address) => {
        console.log("Выбраны координаты:", coords);
        console.log("Адрес:", address);

        // Добавим точку на карту
        this.yandexMapService.addPointToMap(this.map, coords);

        // Сохраним или передадим координаты и адрес в компонент
        // Например:
        console.table([{
          Latitude: coords[0],
          Longitude: coords[1],
          Address: address
        }]);
      });
    });
  }

  addPointToMap(point: [number, number]) {
    this.yandexMapService.addPointToMap(this.map, point);
  }

  addPointsToMap(points: [number, number][]) {
    this.yandexMapService.addPointsToMap(this.map, points);
  }
}
