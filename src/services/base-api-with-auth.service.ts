import {AuthTokenNotFoundError} from '../exceptions/auth-token-not-found.error';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminAuthService} from '../components/modules/admin/services/admin-auth.service';
import {BaseAuthService} from './base-auth.service';

export abstract class BaseApiWithAuthService {
  protected token: string | null = '';

  protected constructor(protected http: HttpClient, protected authService: BaseAuthService) {
    this.token = this.authService.getToken();
  }

  protected checkToken() : string {
    if (!this.authService.isAuthenticated()) {
      throw new AuthTokenNotFoundError("Токен не найден");
    }
    this.token = this.authService.getToken();
    return this.token ? this.token : '';
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
