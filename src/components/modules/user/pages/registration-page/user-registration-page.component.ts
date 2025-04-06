import { Component } from '@angular/core';
import {UserModule} from '../../user.module';

@Component({
  selector: 'app-registration-page',
  templateUrl: './user-registration-page.component.html',
  standalone: true,
  imports: [
    UserModule
  ],
  styleUrl: './user-registration-page.component.css'
})
export class UserRegistrationPageComponent {

  constructor() { }

  handleErrorForm() {  }

  handleCompletedForm() {
    window.history.back();
  }
}
