import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ICategory } from '../dto/ICategory';
import {Injectable} from '@angular/core';
import {API_URLS} from '../api-routes.config';
import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteCategoriesService extends BaseApiWithAuthService {
  private apiUrl = `${API_URLS.admins}/categories`;

  constructor(http: HttpClient, authService: AdminAuthService) {
    super(http, authService);
  }

  get(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.apiUrl}/${id}`);
  }

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.apiUrl}`);
  }

  create(categoryItem: ICategory): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.apiUrl}`, categoryItem, this.getOptions());
  }

  update(categoryItem: ICategory) : Observable<ICategory> {
    return this.http.put<ICategory>(`${this.apiUrl}`, categoryItem, this.getOptions());
  }

  delete(id: number) : Observable<object> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getOptions());
  }
}
