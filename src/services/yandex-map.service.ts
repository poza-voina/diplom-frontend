import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import {IBaseRouteCuePoint} from '../data/cuePoint/CuePoint';
import {environment} from '../env';

@Injectable({
  providedIn: 'root',
})
export class YandexMapService {
  private isYandexLoaded = false;
  private currentPointMarker: any = null;
  private routePointMarkers: any;
  private polylines: any;

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

  // Обработка клика по карте: получение координат и адреса
  setClickListener(map: any, callback: (coords: [number, number], address: string) => void) {
    map.events.add('click', (e: any) => {
      const coords: [number, number] = e.get('coords');

      (window as any)['ymaps'].geocode(coords).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);
        const address = firstGeoObject?.getAddressLine() || 'Адрес не найден';

        callback(coords, address);
      }, (err: any) => {
        console.error('Ошибка геокодирования:', err);
        callback(coords, 'Ошибка получения адреса');
      });
    });
  }

  removeClickListener(map: any, handler: Function) {
    map.events.remove('click', handler);
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
      this.loadYandexMaps(environment.yandexMapsApiKey).then(() => {
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

  addRoutePointsToMap(map: any, points: IBaseRouteCuePoint[]) {
    this.clearRoutePoints(map);
    this.clearPolylines(map);

    // Нарисовать маркеры
    points.forEach(point => {
      let coord = [point.latitude, point.longitude] as [number, number];
      console.log(coord);

      const routeMarker = new (window as any)['ymaps'].Placemark(coord, {
        // Текст внутри маркера
        iconContent: point.sortIndex + 1
      }, {
        preset: 'islands#icon', // Иконка маркера
        iconContentColor: '#FFFFFF',  // Цвет текста внутри маркера
        iconContentFontSize: '14px',  // Размер шрифта
        iconContentPadding: [5, 5]    // Отступы для текста внутри маркера
      });

      routeMarker.properties.set('balloonContent', point.title);
      map.geoObjects.add(routeMarker);
      this.routePointMarkers.push(routeMarker);
    });

    // Преобразуем точки в массив координат для Polyline
    const coordinates = points.map(point => [point.latitude, point.longitude]);

    // Нарисовать линию маршрута без стрелок
    const polyline = new (window as any)['ymaps'].Polyline(coordinates, {}, {
      strokeColor: "#1E90FF",
      strokeWidth: 4,
      strokeOpacity: 0.8
    });

    map.geoObjects.add(polyline);
    this.polylines.push(polyline);
  }

  clearRoutePoints(map: any) {
    map.balloon.close();
    if (this.routePointMarkers){
      this.routePointMarkers.forEach((x: any) => map.geoObjects.remove(x));
    }
    this.routePointMarkers = [];
  }

  clearPolylines(map: any) {
    if (this.polylines) {
      this.polylines.forEach((x: any) => map.geoObjects.remove(x));
    }
    this.polylines = [];
  }

  // Добавление точки на карту
  addPointToMap(map: any, point: [number, number]) {
    // Удаляем предыдущую точку, если есть
    if (this.currentPointMarker) {
      map.geoObjects.remove(this.currentPointMarker);
    }

    // Создаём новую точку
    this.currentPointMarker = new (window as any)['ymaps'].Placemark(point);
    map.geoObjects.add(this.currentPointMarker);
  }

  // Добавление нескольких точек
  addPointsToMap(map: any, points: [number, number][]) {
    points.forEach(point => this.addPointToMap(map, point));
  }
}
