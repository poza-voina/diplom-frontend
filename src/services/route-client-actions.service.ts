import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {HttpClient} from '@angular/common/http';
import {ClientAuthService} from '../components/modules/user/service/client-auth.service';

export class RouteClientActionsService extends BaseApiWithAuthService{
  constructor(http: HttpClient, authService: ClientAuthService) {
    super(http, authService);
  }
}
