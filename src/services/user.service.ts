import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUserProfileDto} from '../dto/IUserProfileDto';
import {IRegistrationUserDto} from '../dto/IRegistrationUserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:5233/api/users';

  constructor(private http: HttpClient) {
  }

  public register(user: IRegistrationUserDto): Observable<IUserProfileDto> {
    return this.http.post<IUserProfileDto>(
      `${this.apiUrl}/register`,
      user,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      })
  }
}
