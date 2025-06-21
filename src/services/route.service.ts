import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, EMPTY, map, Observable, of} from 'rxjs';
import {IRouteExample} from '../data/IRouteExample';
import {BaseApiService} from './base-api.service';
import {IGetVisibleRouteWithPaginate} from '../dto/get-all-dto.interface';
import {AttachmentService} from './attachment.service';
import {ISelectMonth} from '../dto/i-select.month';
import {IBaseRoute, IRouteWithAttachment} from '../data/route/IBaseRoute';
import {IRouteCuePointWithAttachment} from '../data/cuePoint/CuePoint';
import {environment} from '../env';
import {ICollectionDto} from '../data/ICollection';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseApiService {
  private apiUrl = `${environment.apiUrl}/routes`;
  private getRouteExamplesByMonthApiUrl = `${environment.apiUrl}/routes/route-examples/by-month`;
  private getRouteExampleApiUrl = `${environment.apiUrl}/route-examples`;

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

  getVisibleRoutes(getRoutesDto: IGetVisibleRouteWithPaginate) : Observable<ICollectionDto<IRouteWithAttachment>> {
    console.log(getRoutesDto);
    let params = new HttpParams()
      .set('pageNumber', getRoutesDto.pageNumber)
      .set('pageSize', getRoutesDto.pageSize)
      .set('title', getRoutesDto.title)
      if (getRoutesDto.category) {
        params = params.set('category', getRoutesDto.category)
      }

    return this.http.get<ICollectionDto<IRouteWithAttachment>>(`${this.apiUrl}/visible-routes`, {...this.getOptions(), params});
  }

  getRouteExamplesByMonth(selectedMonth: ISelectMonth) : Observable<IRouteExample[]> {
    const params = new HttpParams()
      .set('year', selectedMonth.year.toString())
      .set('month', selectedMonth.month.toString())
      .set('routeId', selectedMonth.routeId);

    return this.http.get<IRouteExample[]>(this.getRouteExamplesByMonthApiUrl, {params});
  }

  getRouteExample(id: number) : Observable<IRouteExample> {
    return this.http.get<IRouteExample>(`${this.getRouteExampleApiUrl}/${id}`);
  }
}
