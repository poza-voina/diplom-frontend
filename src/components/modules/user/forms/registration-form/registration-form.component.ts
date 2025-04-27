import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IRegistrationUserDto} from '../../../../../dto/IRegistrationUserDto';
import {UserService} from '../../../../../services/user.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-registration-form',
  standalone: false,
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent implements OnInit {
  registrationUser: IRegistrationUserDto = {
    email: null,
    firstName: null,
    secondName: null,
    patronymic: null,
    phoneNumber: null,
    repeatPassword: null,
    password: null
  };

  @Output()
  completedForm = new EventEmitter<void>();
  @Output()
  errorForm = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {

  }

  handleSendForm() {
    this.userService
      .register(this.registrationUser)
      .subscribe(
        {
          error: (error) => this.errorForm.emit(),
          complete: () => this.completedForm.emit()
        }
      )
  }
}
