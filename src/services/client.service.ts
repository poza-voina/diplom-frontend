import {BaseApiWithAuthService} from './base-api-with-auth.service';
import {HttpClient} from '@angular/common/http';
import {ClientAuthService} from '../components/modules/user/service/client-auth.service';
import {Observable} from 'rxjs';
import {IUserProfileDto} from '../dto/IUserProfileDto';
import {Injectable} from '@angular/core';
import {environment} from '../env';
import {IRegistrationUserDto} from '../dto/IRegistrationUserDto';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseApiWithAuthService {
  private profileUpdateRoute: string = `${environment.apiUrl}/client/profile`;

  constructor(http: HttpClient, authService: ClientAuthService) {
    super(http, authService);
  }

  getProfile(): Observable<IUserProfileDto> {
    return this.http.get<IUserProfileDto>(`${environment.apiUrl}/client/profile`, this.getOptions())
  }

  public updateProfile(user: IRegistrationUserDto): Observable<IUserProfileDto> {
    return this.http.put<IUserProfileDto>(
      this.profileUpdateRoute,
      user,
      this.getOptions())
  }
}
