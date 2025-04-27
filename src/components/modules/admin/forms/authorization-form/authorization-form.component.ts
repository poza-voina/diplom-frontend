import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ILoginCredentials} from '../../../../../dto/login-credentials.interface';

@Component({
  selector: 'app-authorization-form',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './authorization-form.component.html',
  styleUrl: './authorization-form.component.css'
})
export class AuthorizationFormComponent {
  credentials: ILoginCredentials = {
    email: null,
    password: null,
  };

  @Output()
  completedForm = new EventEmitter<ILoginCredentials>();

  constructor() {}

  handleSendForm() {
    this.completedForm.emit(this.credentials);
  }
}
