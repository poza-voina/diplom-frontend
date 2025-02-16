import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouteItem} from '../data/RouteItem';
import {GetRoutesDto} from './GetRoutesDto';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private apiUrl = 'https://localhost:5233/api/routes';

  constructor(private http: HttpClient) { }

  getRoutes(dto: GetRoutesDto): Observable<RouteItem[]> {
    let params = new HttpParams();

    Object.keys(dto).forEach(key => {
      const value = dto[key as keyof GetRoutesDto];

      // Проверяем, если это массив (например, фильтры)
      if (Array.isArray(value)) {
        value.forEach(val => {
          params = params.append(key, val.toString()); // Для каждого элемента массива добавляем отдельный параметр
        });
      } else if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<RouteItem[]>(this.apiUrl, { params });
  }

  updateRoute(route : RouteItem): Observable<RouteItem> {
    return this.http.put<RouteItem>(this.apiUrl, route);
  }

  createRoute(route: RouteItem): Observable<RouteItem> {
    return this.http.post<RouteItem>(this.apiUrl, route, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
