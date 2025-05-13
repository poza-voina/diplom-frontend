import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginCredentials} from '../dto/login-credentials.interface';
import {Injectable} from "@angular/core";
import {jwtDecode} from 'jwt-decode';

export abstract class BaseAuthService {
  protected readonly tokenKey!: string;
  protected readonly loginRoute!: string;

  protected constructor(
    protected http: HttpClient,
    authRoute: string,
    tokenKey: string) {

    this.loginRoute = `${authRoute}/login`;
    this.tokenKey = tokenKey;
  }

  public getJwt(credentials: ILoginCredentials ): Observable<string> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Missing credentials');
    }

    return this.http.post<string>(this.loginRoute, credentials);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Получить токен
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Удалить токен
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) return false;

    try {
      const decoded: JwtPayload = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах

      return decoded.exp > currentTime; // true, если токен ещё действителен
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return false;
    }
  }
}


export interface JwtPayload {
  exp: number; // Время истечения срока действия токена (в секундах)
}
