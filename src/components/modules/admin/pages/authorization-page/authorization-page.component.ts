import { Component } from '@angular/core';
import {AuthorizationFormComponent} from '../../forms/authorization-form/authorization-form.component';
import {ILoginCredentials} from '../../../../../dto/login-credentials.interface';
import {NgIf} from '@angular/common';
import {AdminAuthService} from '../../services/admin-auth.service';
import {Router} from '@angular/router';

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

  constructor(private authService: AdminAuthService, private router: Router) {
  }

  handleCompletedForm(credentials: ILoginCredentials) {
    this.authService.getJwt(credentials).subscribe(
      {
        next: (next: string) => {
          this.isLoginError = false;
          this.authService.setToken(next)
          this.router.navigate(['/admin']);
        },
        error: err => {
          this.isLoginError = true;
          console.log(err)}
      }
    )
  }
}
