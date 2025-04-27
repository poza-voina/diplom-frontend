import {BaseUserService} from '../../../../services/base-user.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_URLS} from '../../../../api-routes.config';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService extends BaseUserService {
  constructor(http: HttpClient) {
    super(http);
    this.route = API_URLS.admins + '/auth/login';
  }
}
