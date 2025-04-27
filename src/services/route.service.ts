import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouteItem} from '../data/RouteItem';
import {RouteExampleItem} from '../data/RouteExampleItem';
import {IRouteCuePointItem} from '../data/CuePoint';
import {GetRoutesDto} from '../dto/GetRoutesDto';
import {API_URLS} from '../api-routes.config';
import {AuthService} from './auth.service';
import {AuthTokenNotFoundError} from '../exceptions/auth-token-not-found.error';
import {BaseApiService} from './base-api-service';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseApiService {

  private apiUrl = `${API_URLS.admins}/routes`;

  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getRoute(id: number): Observable<RouteItem> {
    return this.http.get<RouteItem>(`${this.apiUrl}/${id}`, this.getOptions());
  }

  getRouteExamples(id: number): Observable<RouteExampleItem[]> {
    return this.http.get<RouteExampleItem[]>(`${this.apiUrl}/${id}/examples`, this.getOptions());
  }

  getRouteCuePoints(id: number) : Observable<IRouteCuePointItem[]> {
    return this.http.get<IRouteCuePointItem[]>(`${this.apiUrl}/${id}/cue-points`, this.getOptions());
  }

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

    return this.http.get<RouteItem[]>(this.apiUrl, { params, ...this.getOptions() });
  }

  updateRoute(route : RouteItem): Observable<RouteItem> {
    return this.http.put<RouteItem>(this.apiUrl, route, this.getOptions());
  }

  createRoute(route: RouteItem): Observable<RouteItem> {
    return this.http.post<RouteItem>(this.apiUrl, route, this.getOptions());
  }

  updateRouteCuePoints(cuePointItems: IRouteCuePointItem[]): Observable<IRouteCuePointItem[]> {
    return this.http.put<IRouteCuePointItem[]>(this.apiUrl + "/update-cue-points", cuePointItems, this.getOptions());
  }
}
