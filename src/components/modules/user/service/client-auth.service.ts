import {BaseAuthService} from '../../../../services/base-auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {API_URLS} from '../../../../api-routes.config';
import {IRegistrationUserDto} from '../../../../dto/IRegistrationUserDto';
import {Observable} from 'rxjs';
import {IUserProfileDto} from '../../../../dto/IUserProfileDto';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService extends BaseAuthService {
  registerRoute!: string;
  private static tokenKey: string = 'clientTokenKey';

  constructor(http: HttpClient) {
    let authRoute = `${API_URLS.clients}/auth`;
    super(http, authRoute, ClientAuthService.tokenKey);
    this.registerRoute = authRoute + '/register';
  }

  public register(user: IRegistrationUserDto): Observable<IUserProfileDto> {
    return this.http.post<IUserProfileDto>(
      this.registerRoute,
      user,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
  }
}
