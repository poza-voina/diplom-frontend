import {Injectable} from '@angular/core';
import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {IBaseRouteCuePoint} from '../data/cuePoint/CuePoint';
import {Observable} from 'rxjs';
import {IBaseRoute, IRouteWithAttachment} from '../data/route/IBaseRoute';
import {IGetPendingRoutesExamplesRequest, IRouteExample, IRouteExampleWithRoute} from '../data/IRouteExample';
import {GetRoutesWithFiltersDto} from '../dto/GetRoutesWithFiltersDto';
import {INewCategoryRequest} from '../dto/new-category-item.interface';
import {ICategory} from '../dto/ICategory';
import {environment} from '../env';
import {ICollectionDto} from '../data/ICollection';
import {IRouteExampleRecord} from '../data/IRouteExampleRecord';

@Injectable({
  providedIn: 'root'
})
export class AdminActionsService extends BaseApiWithAuthService {
  private apiRoutesUrl = `${environment.apiUrl}/routes`;
  private apiRoutesExampleUrl = `${environment.apiUrl}/route-examples`;
  private apiRoutesExampleRecordUrl = `${environment.apiUrl}/route-example-records`;
  private apiRouteCategoriesUrl = `${environment.apiUrl}/categories`;

  constructor(http: HttpClient, authService: AdminAuthService) {
    super(http, authService);
  }

  updateRoute(route: IBaseRoute): Observable<IRouteWithAttachment> {
    return this.http.put<IRouteWithAttachment>(this.apiRoutesUrl, route, this.getOptions());
  }

  createRoute(route: IBaseRoute): Observable<IBaseRoute> {
    return this.http.post<IBaseRoute>(this.apiRoutesUrl, route, this.getOptions());
  }

  removeRoute(id: number) : Observable<any> {
    return this.http.delete<IBaseRoute>(this.apiRoutesUrl + `/${id}`, this.getOptions());
  }

  updateRouteCuePoints(cuePointItems: IBaseRouteCuePoint[]): Observable<IBaseRouteCuePoint[]> {
    return this.http.put<IBaseRouteCuePoint[]>(this.apiRoutesUrl + "/update-cue-points", cuePointItems, this.getOptions());
  }


  createOrUpdateRouteExample(routeExampleItem: IRouteExample): Observable<IRouteExample> {
    return this.http.put<IRouteExample>(this.apiRoutesExampleUrl, routeExampleItem, this.getOptions());
  }

  deleteRouteExample(index: number): Observable<any> {
    return this.http.delete(`${this.apiRoutesExampleUrl}/${index}`, this.getOptions());
  }

  createOrUpdateRouteExamples(routeExampleItems: IRouteExample[]): Observable<IRouteExample[]> {
    return this.http.put<IRouteExample[]>(this.apiRoutesExampleUrl + "/by-route", routeExampleItems, this.getOptions());
  }

  getRoutes(dto: GetRoutesWithFiltersDto): Observable<ICollectionDto<IRouteWithAttachment>> {
    let params = new HttpParams();

    Object.keys(dto).forEach(key => {
      const value = dto[key as keyof GetRoutesWithFiltersDto];

      if (Array.isArray(value)) {
        value.forEach(val => {
          params = params.append(key, val.toString());
        });
      } else if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<ICollectionDto<IRouteWithAttachment>>(this.apiRoutesUrl, {params, ...this.getOptions()});
  }

  getFilteredRoutesExamples(request: IGetPendingRoutesExamplesRequest): Observable<ICollectionDto<IRouteExampleWithRoute>> {
    let params = new HttpParams();

    Object.keys(request).forEach(key => {
      const value = request[key as keyof IGetPendingRoutesExamplesRequest];

      if (Array.isArray(value)) {
        value.forEach(val => {
          params = params.append(key, val.toString());
        });
      } else if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<ICollectionDto<IRouteExampleWithRoute>>(`${this.apiRoutesExampleUrl}/filter`, {params, ...this.getOptions()});
  }

  createCategory(dto: INewCategoryRequest): Observable<ICategory> {
    return this.http.post<ICategory>(this.apiRouteCategoriesUrl, dto, this.getOptions());
  }

  getRouteExample(id: number): Observable<IRouteExample> {
    return this.http.get<IRouteExample>(`${this.apiRoutesExampleUrl}/${id}`, this.getOptions());
  }

  updateRecordStatus(routeExampleRecord: IRouteExampleRecord): Observable<IRouteExampleRecord> {
    return this.http.put<IRouteExampleRecord>(
      `${this.apiRoutesExampleRecordUrl}/change-status`,
      routeExampleRecord,
      this.getOptions()
    );
  }

  updateRecordsStatuses(routeExampleRecords: IRouteExampleRecord[]): Observable<IRouteExampleRecord[]> {
    return this.http.put<IRouteExampleRecord[]>(
      `${this.apiRoutesExampleRecordUrl}/change-statuses`,
      routeExampleRecords,
      this.getOptions()
    );
  }
}
