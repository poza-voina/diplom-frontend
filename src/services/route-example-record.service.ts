import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRouteExampleRecordWithClient} from '../data/IRouteExampleRecord';
import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {environment} from '../env';

@Injectable({
  providedIn: 'root'
})
export class RouteExampleRecordService extends BaseApiWithAuthService {
  private apiUrl = `${environment.apiUrl}/route-example-records`;
  private apiUrlGetRouteExampleRecords = `${this.apiUrl}/filter`;

  constructor(http: HttpClient, authService: AdminAuthService) {
    super(http, authService);
  }

  getRouteExampleRecordsWithClient(request: IGetFilteredRouteExampleRecords): Observable<IRouteExampleRecordWithClient[]> {
    const params = new HttpParams({
      fromObject: Object.fromEntries(
        Object.entries(request).filter(([_, v]) => v !== undefined && v !== null)
      )
    });

    return this.http.get<IRouteExampleRecordWithClient[]>(this.apiUrlGetRouteExampleRecords, {
      ...this.getOptions(),
      params: params
    });
  }
}

export interface IGetFilteredRouteExampleRecords {
  pageNumber?: number,
  pageSize?: number,
  routeExampleId?: number
}
