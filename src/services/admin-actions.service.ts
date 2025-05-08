import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {IRouteItem} from '../data/IRouteItem';
import {Observable} from 'rxjs';
import {IRouteCuePointItem} from '../data/CuePoint';
import {API_URLS} from '../api-routes.config';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {GetRoutesWithFiltersDto} from '../dto/GetRoutesWithFiltersDto';
import {Injectable} from '@angular/core';
import {IRouteExampleItem} from '../data/IRouteExampleItem';
import {
  IRouteExampleItemW
} from '../components/modules/admin/components/route-examples-table/route-examples-table.component';
import {INewCategoryItem} from '../dto/new-category-item.interface';
import {ICategoryItem} from '../dto/ICategoryItem';

@Injectable({
  providedIn: 'root'
})
export class AdminActionsService extends BaseApiWithAuthService {
  private apiRoutesUrl = `${API_URLS.admins}/routes`;
  private apiRoutesExampleUrl = `${API_URLS.admins}/route-examples`;
  private apiRouteCategoriesUrl = `${API_URLS.admins}/categories`;

  constructor(http: HttpClient, authService: AdminAuthService) {
    super(http, authService);
  }

  updateRoute(route : IRouteItem): Observable<IRouteItem> {
    return this.http.put<IRouteItem>(this.apiRoutesUrl, route, this.getOptions());
  }

  createRoute(route: IRouteItem): Observable<IRouteItem> {
    return this.http.post<IRouteItem>(this.apiRoutesUrl, route, this.getOptions());
  }

  updateRouteCuePoints(cuePointItems: IRouteCuePointItem[]): Observable<IRouteCuePointItem[]> {
    return this.http.put<IRouteCuePointItem[]>(this.apiRoutesUrl + "/update-cue-points", cuePointItems, this.getOptions());
  }

  createOrUpdateRouteExample(routeExampleItem: IRouteExampleItem): Observable<IRouteExampleItem> {
    return this.http.put<IRouteExampleItem>(this.apiRoutesExampleUrl, routeExampleItem, this.getOptions());
  }

  deleteRouteExample(index: number) : Observable<any> {
    return this.http.delete(`${this.apiRoutesExampleUrl}/${index}`, this.getOptions());
  }

  createOrUpdateRouteExamples(routeExampleItems: IRouteExampleItem[]): Observable<IRouteExampleItem[]> {
    return this.http.put<IRouteExampleItem[]>(this.apiRoutesExampleUrl + "/by-route", routeExampleItems, this.getOptions());
  }

  getRoutes(dto: GetRoutesWithFiltersDto): Observable<IRouteItem[]> {
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

    return this.http.get<IRouteItem[]>(this.apiRoutesUrl, { params, ...this.getOptions() });
  }

  createCategory(dto: INewCategoryItem) : Observable<ICategoryItem> {
   return this.http.post<ICategoryItem>(this.apiRouteCategoriesUrl, dto, this.getOptions());
  }
}
