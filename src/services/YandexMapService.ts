// yandex-map.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YandexMapService {

  private ymaps: any;

  constructor() {}

  // Загрузка скрипта API Яндекс Карт
  loadYandexMaps(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof (window as any)['ymaps'] !== 'undefined') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Yandex Maps'));
        document.head.appendChild(script);
      }
    });
  }

  // Создание карты
  initializeMap(containerId: string, routeCoords: [number, number][]) {
    return new Promise((resolve, reject) => {
      this.loadYandexMaps('268c38ba-239f-4d68-b429-57fcd29522bb').then(() => {
        // Использование приведения типа
        (window as any)['ymaps'].ready(() => {
          const map = new (window as any)['ymaps'].Map(containerId, {
            center: routeCoords.length ? routeCoords[0] : [55.751574, 37.573856],
            zoom: 10
          });
          resolve(map);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  // Добавление точки на карту
  addPointToMap(map: any, point: [number, number]) {
    const pointMarker = new (window as any)['ymaps'].Placemark(point);
    map.geoObjects.add(pointMarker);
  }

  // Добавление нескольких точек на карту
  addPointsToMap(map: any, points: [number, number][]) {
    points.forEach(point => this.addPointToMap(map, point));
  }
}
