import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YandexMapService {
  private isYandexLoaded = false;

  constructor() {}

  // Загрузка API Яндекс Карт
  loadYandexMaps(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof (window as any)['ymaps'] !== 'undefined') {
        this.isYandexLoaded = true;
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
        script.async = true;
        script.onload = () => {
          this.isYandexLoaded = true;
          resolve();
        };
        script.onerror = () => reject(new Error('Failed to load Yandex Maps'));
        document.head.appendChild(script);
      }
    });
  }

  // Получение подсказок адреса
  getAddressSuggestions(query: string): Observable<string[]> {
    return new Observable((observer: Observer<string[]>) => {
      if (!this.isYandexLoaded) {
        observer.error('Yandex Maps API не загружен');
        return;
      }

      (window as any)['ymaps'].suggest(query).then(
        (items: any[]) => {
          const suggestions = items.map(item => item.value);
          observer.next(suggestions);
          observer.complete();
        },
        (error: any) => observer.error(error)
      );
    });
  }

  // Инициализация карты
  initializeMap(containerId: string, routeCoords: [number, number][]) {
    return new Promise((resolve, reject) => {
      this.loadYandexMaps('268c38ba-239f-4d68-b429-57fcd29522bb').then(() => {
        (window as any)['ymaps'].ready(() => {
          const map = new (window as any)['ymaps'].Map(containerId, {
            center: routeCoords.length ? routeCoords[0] : [55.751574, 37.573856],
            zoom: 10
          });
          resolve(map);
        });
      }).catch(error => reject(error));
    });
  }

  // Добавление точки на карту
  addPointToMap(map: any, point: [number, number]) {
    const pointMarker = new (window as any)['ymaps'].Placemark(point);
    map.geoObjects.add(pointMarker);
  }

  // Добавление нескольких точек
  addPointsToMap(map: any, points: [number, number][]) {
    points.forEach(point => this.addPointToMap(map, point));
  }
}
