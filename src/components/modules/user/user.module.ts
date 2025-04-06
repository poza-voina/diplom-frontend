import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRegistrationPageComponent} from './pages/registration-page/user-registration-page.component';
import {UserAuthorizationPageComponent} from './pages/authorization-page/user-authorization-page.component';
import {AuthorizationFormComponent} from './forms/authorization-form/authorization-form.component';
import {RegistrationFormComponent} from './forms/registration-form/registration-form.component';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../services/UserService';

@NgModule({
  declarations: [
    AuthorizationFormComponent,
    RegistrationFormComponent,
  ],
  providers: [
    UserService,
  ],
  exports: [
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class UserModule {
}
