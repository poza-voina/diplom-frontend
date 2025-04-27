import {AuthTokenNotFoundError} from '../exceptions/auth-token-not-found.error';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';

export class BaseApiService {
  protected token: string | null = '';

  constructor(protected http: HttpClient, protected authService: AuthService) {
    this.token = this.authService.getToken();
  }

  protected checkToken() : string {
    if (!this.token) {
      throw new AuthTokenNotFoundError("Токен не найден");
    }
    return this.token;
  }

  protected getOptions(): { headers: HttpHeaders } {
    const token = this.checkToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return { headers };
  }
}
