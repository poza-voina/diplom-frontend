import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRegistrationPageComponent} from './pages/registration-page/user-registration-page.component';
import {UserAuthorizationPageComponent} from './pages/authorization-page/user-authorization-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
  ],
  providers: [
  ],
  exports: [
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class UserModule {
}
