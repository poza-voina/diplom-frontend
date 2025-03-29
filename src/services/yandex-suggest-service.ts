import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YandexSuggestionsService {
  private apiUrl = 'https://geocode-maps.yandex.ru/1.x'; // URL для API подсказок Яндекс
  private apiKey: string = "268c38ba-239f-4d68-b429-57fcd29522bb";

  constructor(private http: HttpClient) {}

  getAddressSuggestions(query: string): Observable<string[]> {
    console.log(query);
    if (!query || query.length < 3) {
      return of([]); // Возвращаем пустой массив, чтобы избежать ошибок
    }

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('geocode', query)
      .set('format', 'json')
      .set('results', '5');

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        console.log("response", response);  // Проверим весь ответ
        const features = response?.response?.GeoObjectCollection?.featureMember || [];
        console.log("features", features);
        return features.map((feature: any) => this.getComponents(feature).join(" ")) || [];
      })
    );
  }

  getComponents(feature: any) {
    console.log("getComponents", feature);
    let kinds : string[] = [
      "country",
      "province",
      "locality",
      "street",
      "house",
      "entrance",
    ];
    let components : AddressComponent[] = feature?.GeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components || null;
    if (!components) { return [] }

    let result : string[] = [];

    for (let item of kinds) {
       let component = components.filter(x => x.kind === item).at(-1);
       if (component) {
         result.push(component.name);
       }
    }

    console.log("result", result);
    return result;
  }
}

interface AddressComponent {
  kind: string;
  name: string;
}
