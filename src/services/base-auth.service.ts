import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginCredentials} from '../dto/login-credentials.interface';
import {Injectable} from "@angular/core";

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

  // Проверить наличие токена
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
