import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginCredentials} from '../dto/login-credentials.interface';

export abstract class BaseUserService {
  protected route: string = 'route';

  constructor(private http: HttpClient) { }

  public getJwt(credentials: ILoginCredentials ): Observable<string> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Missing credentials');
    }

    return this.http.post<string>(this.route, credentials);
  }
}
