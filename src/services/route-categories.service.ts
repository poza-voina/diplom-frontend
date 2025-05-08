import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilterRouteCategoriesRequest} from '../dto/FilterRouteCategoriesRequest';
import { ICategoryItem } from '../dto/ICategoryItem';

import {Injectable} from '@angular/core';
import {API_URLS} from '../api-routes.config';
import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {BaseAuthService} from './base-auth.service';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteCategoriesService extends BaseApiWithAuthService {
  private apiUrl = `${API_URLS.admins}/categories`;

  constructor(http: HttpClient, authService: AdminAuthService) {
    super(http, authService);
  }

  get(id: number): Observable<ICategoryItem> {
    return this.http.get<ICategoryItem>(`${this.apiUrl}/${id}`, this.getOptions());
  }

  getAll(): Observable<ICategoryItem[]> {
    return this.http.get<ICategoryItem[]>(`${this.apiUrl}`, this.getOptions());
  }

  create(categoryItem: ICategoryItem): Observable<ICategoryItem> {
    return this.http.post<ICategoryItem>(`${this.apiUrl}`, categoryItem, this.getOptions());
  }

  update(categoryItem: ICategoryItem) : Observable<ICategoryItem> {
    return this.http.put<ICategoryItem>(`${this.apiUrl}`, categoryItem, this.getOptions());
  }

  delete(id: number) : Observable<object> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getOptions());
  }
}
