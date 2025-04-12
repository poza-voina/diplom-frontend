import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FilterRouteCategoriesRequest} from '../dto/FilterRouteCategoriesRequest';
import { CategoryItem } from '../dto/CategoryItem';
import {GetRoutesDto} from './GetRoutesDto';

export class RouteCategoriesService {
  private defaultApiParams = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  private apiUrl = 'https://localhost:5233/api/categories';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<CategoryItem> {
    return this.http.get<CategoryItem>(`${this.apiUrl}/${id}`);
  }

  filter(request : FilterRouteCategoriesRequest): Observable<CategoryItem[]> {
    // не работает!
    return this.http.get<CategoryItem[]>(`${this.apiUrl}`, );
  }

  create(categoryItem: CategoryItem): Observable<CategoryItem> {
    return this.http.post<CategoryItem>(`${this.apiUrl}`, categoryItem, this.defaultApiParams);
  }

  update(categoryItem: CategoryItem) : Observable<CategoryItem> {
    return this.http.put<CategoryItem>(`${this.apiUrl}`, categoryItem, this.defaultApiParams);
  }

  delete(id: number) : Observable<object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
