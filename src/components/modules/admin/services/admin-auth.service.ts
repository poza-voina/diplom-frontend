import {BaseAuthService} from '../../../../services/base-auth.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../env';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService extends BaseAuthService {
  private static readonly tokenKey: string = 'adminTokenKey';

  constructor(http: HttpClient) {
    super(http, `${environment.apiUrl}/admin/auth`, AdminAuthService.tokenKey);
  }
}
