import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor() {}

  public login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
