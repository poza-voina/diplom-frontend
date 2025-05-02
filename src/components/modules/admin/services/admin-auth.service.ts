import {BaseAuthService} from '../../../../services/base-auth.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URLS} from '../../../../api-routes.config';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService extends BaseAuthService {
  private static readonly tokenKey: string = 'adminTokenKey';

  constructor(http: HttpClient) {
    super(http, `${API_URLS.admins}/admin/auth`, AdminAuthService.tokenKey);
  }
}
