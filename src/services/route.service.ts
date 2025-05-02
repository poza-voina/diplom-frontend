import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouteItem} from '../data/RouteItem';
import {RouteExampleItem} from '../data/RouteExampleItem';
import {IRouteCuePointItem} from '../data/CuePoint';
import {GetRoutesWithFiltersDto} from '../dto/GetRoutesWithFiltersDto';
import {API_URLS} from '../api-routes.config';
import {BaseAuthService} from './base-auth.service';
import {AuthTokenNotFoundError} from '../exceptions/auth-token-not-found.error';
import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {BaseApiService} from './base-api.service';
import {IGetAllDto} from '../dto/get-all-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class RouteService extends BaseApiService {

  private apiUrl = `${API_URLS.admins}/routes`;

  constructor(private http: HttpClient) {
    super();
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

  getVisibleRoutes(getRoutesDto: IGetAllDto) : Observable<RouteItem[]> {
    return this.http.get<RouteItem[]>(`${this.apiUrl}/visible-routes`, this.getOptions());
  }
}
