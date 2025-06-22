import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ClientAuthService} from '../components/modules/user/service/client-auth.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {IBookRouteExampleRecord, IRouteExampleRecord} from '../data/IRouteExampleRecord';
import {IRouteExample} from '../data/IRouteExample';
import {IGetBooksRequestByDateRange} from '../data/book/IGetBooksRequestByDateRange';
import {IGetBooksRequestWithPaginate} from '../data/book/IGetBooksRequestWithPaginate';
import {environment} from '../env';
import {IRegistrationUserDto} from '../dto/IRegistrationUserDto';
import {IUserProfileDto} from '../dto/IUserProfileDto';

@Injectable({
  providedIn: 'root'
})
export class ClientActionsService extends BaseApiWithAuthService {
  private apiClientActions: string = `${environment.apiUrl}/client/actions`;
  private apiClientBooks: string = `${this.apiClientActions}/books`;

  constructor(http: HttpClient, authService: ClientAuthService) {
    super(http, authService);
  }

  book(routeExampleId: number): Observable<any> {
    let options = this.getOptions();
    return this.http.post(`${this.apiClientBooks}/${routeExampleId}`, null, options);
  }

  unBook(routeExampleId: number): Observable<any> {
    return this.http.delete(`${this.apiClientBooks}/${routeExampleId}`, this.getOptions());
  }

  getBook(bookId: number): Observable<any> {
    return this.http.get(`${this.apiClientBooks}/${bookId}`, this.getOptions());
  }

  getBooks(request: IGetBooksRequestByDateRange | IGetBooksRequestWithPaginate): Observable<IBookRouteExampleRecord[]> {
    return this.http.get<IBookRouteExampleRecord[]>(
      this.apiClientBooks,
      {
        ...this.getOptions(),
        params: this.getBooksRequestToQueryParams(request)
      }
    );
  }

  getBooksRequestToQueryParams(
    request: IGetBooksRequestByDateRange | IGetBooksRequestWithPaginate
  ): HttpParams {
    let params = new HttpParams();

    Object.entries(request).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }
}



