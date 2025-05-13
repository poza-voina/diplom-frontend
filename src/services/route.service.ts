import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, EMPTY, map, Observable, of} from 'rxjs';
import {IRouteExample} from '../data/IRouteExample';
import {API_URLS} from '../api-routes.config';
import {BaseApiService} from './base-api.service';
import {IGetVisibleRouteWithPaginate} from '../dto/get-all-dto.interface';
import {AttachmentService} from './attachment.service';
import {ISelectMonth} from '../dto/i-select.month';
import {IBaseRoute, IRouteWithAttachment} from '../data/route/IBaseRoute';
import {IRouteCuePointWithAttachment} from '../data/cuePoint/CuePoint';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseApiService {

  private apiUrl = `${API_URLS.admins}/routes`;
  private getRouteExamplesByMonthApiUrl = `${API_URLS.admins}/routes/route-examples/by-month`;

  constructor(private http: HttpClient, private attachmentService: AttachmentService) {
    super();
  }

  getRoute(id: number): Observable<IRouteWithAttachment> {
    return this.http.get<IRouteWithAttachment>(`${this.apiUrl}/${id}`, this.getOptions());
  }

  getRouteExamples(id: number): Observable<IRouteExample[]> {
    return this.http.get<IRouteExample[]>(`${this.apiUrl}/${id}/examples`, this.getOptions());
  }

  getRouteCuePoints(id: number) : Observable<IRouteCuePointWithAttachment[]> {
    return this.http.get<IRouteCuePointWithAttachment[]>(`${this.apiUrl}/${id}/cue-points`, this.getOptions());
  }

  getVisibleRoutes(getRoutesDto: IGetVisibleRouteWithPaginate) : Observable<IRouteWithAttachment[]> {
    return this.http.get<IRouteWithAttachment[]>(`${this.apiUrl}/visible-routes`, this.getOptions());
  }

  getRouteExamplesByMonth(selectedMonth: ISelectMonth) : Observable<IRouteExample[]> {
    const params = new HttpParams()
      .set('year', selectedMonth.year.toString())
      .set('month', selectedMonth.month.toString())
      .set('routeId', selectedMonth.routeId);

    return this.http.get<IRouteExample[]>(this.getRouteExamplesByMonthApiUrl, {params});
  }
}
