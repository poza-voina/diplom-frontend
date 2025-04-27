import { Component } from '@angular/core';
import {AuthorizationFormComponent} from '../../forms/authorization-form/authorization-form.component';
import {ILoginCredentials} from '../../../../../dto/login-credentials.interface';
import {BaseUserService} from '../../../../../services/base-user.service';
import {AdminUserService} from '../../services/admin-user.service';
import {AuthService} from '../../../../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-authorization-page',
  imports: [
    AuthorizationFormComponent,
    NgIf
  ],
  templateUrl: './authorization-page.component.html',
  styleUrl: './authorization-page.component.css'
})
export class AuthorizationPageComponent {
  isLoginError: boolean = false;

  constructor(private adminUserService: AdminUserService, private authService: AuthService) {
  }

  handleCompletedForm(credentials: ILoginCredentials) {
    this.adminUserService.getJwt(credentials).subscribe(
      {
        next: (next: string) => {
          this.isLoginError = false;
          this.authService.login(next)
          window.history.back();
        },
        error: err => {
          this.isLoginError = true;
          console.log(err)}
      }
    )
  }
}
