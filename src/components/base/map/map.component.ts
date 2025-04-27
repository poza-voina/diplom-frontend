// map.component.ts
import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import {YandexMapService} from '../../../services/yandex-map.service';


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
    })
  }

  addPointToMap(point: [number, number]) {
    this.yandexMapService.addPointToMap(this.map, point);
  }

  addPointsToMap(points: [number, number][]) {
    this.yandexMapService.addPointsToMap(this.map, points);
  }
}
