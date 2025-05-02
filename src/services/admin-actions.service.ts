import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {RouteItem} from '../data/RouteItem';
import {Observable} from 'rxjs';
import {IRouteCuePointItem} from '../data/CuePoint';
import {API_URLS} from '../api-routes.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {GetRoutesWithFiltersDto} from '../dto/GetRoutesWithFiltersDto';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminActionsService extends BaseApiWithAuthService {
  private apiUrl = `${API_URLS.admins}/routes`;

  constructor(http: HttpClient, authService: AdminAuthService) {
    super(http, authService);
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

  getRoutes(dto: GetRoutesWithFiltersDto): Observable<RouteItem[]> {
    let params = new HttpParams();

    Object.keys(dto).forEach(key => {
      const value = dto[key as keyof GetRoutesWithFiltersDto];

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
}
