import {BaseAuthService} from '../../../../services/base-auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IRegistrationUserDto} from '../../../../dto/IRegistrationUserDto';
import {Observable} from 'rxjs';
import {IUserProfileDto} from '../../../../dto/IUserProfileDto';
import {environment} from '../../../../env';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthService extends BaseAuthService {
  registerRoute: string = `${environment.apiUrl}/client/auth/register`;
  private static tokenKey: string = 'clientTokenKey';

  constructor(http: HttpClient) {
    let authRoute = `${environment.apiUrl}/client/auth`;
    super(http, authRoute, ClientAuthService.tokenKey);
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
