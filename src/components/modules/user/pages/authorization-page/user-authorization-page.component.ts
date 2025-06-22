import {Component, HostListener} from '@angular/core';
import {BaseFormComponent, IField, ILink, ISubmitStatus, SubmitStatus} from '../../forms/base-form/base-form.component';
import {Validators} from '@angular/forms';
import {ClientAuthService} from '../../service/client-auth.service';
import {ILoginCredentials} from '../../../../../dto/login-credentials.interface';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './user-authorization-page.component.html',
  standalone: true,
  imports: [
    BaseFormComponent,
    NgClass
  ],
  styleUrl: './user-authorization-page.component.css'
})
export class UserAuthorizationPageComponent {
  submitLabel: string = "Войти";
  formLabel = "Вход"
  fields: IField[] = [
    {
      label: 'Электронная почта',
      name: 'email',
      type: 'email',
      required: true,
      validators: [Validators.required, Validators.email],
      errorMessages: {
        required: 'Email обязателен',
        email: 'Неверный формат email'
      }
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      required: true,
      validators: [Validators.required, Validators.minLength(6)],
      errorMessages: {
        required: 'Пароль обязателен',
        minlength: 'Минимум 6 символов'
      }
    }
  ];
  submitStatus: ISubmitStatus = {
    status: SubmitStatus.DEFAULT,
    message: null
  }
  links: ILink[] = [
    {label: "Зарегистрироваться", link: "/registration"},
  ];
  containerClass = 'w-75';

  ngOnInit() {
    this.setContainerClass(window.innerWidth);
  }

  constructor(private clientAuthService: ClientAuthService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setContainerClass(event.target.innerWidth);
  }

  setContainerClass(width: number) {
    this.containerClass = width <= 800 ? 'w-95' : 'w-75';
  }


  handleFormSubmit(event: any) {
    let credentials: ILoginCredentials = event;

    this.clientAuthService.getJwt(credentials).subscribe(
      {
        next: (response) => {
          this.submitStatus.status = SubmitStatus.SUCCESS;
          this.clientAuthService.setToken(response);
          window.history.back();
        },
        error: (err) => {
          this.submitStatus.status = SubmitStatus.ERROR;
          this.submitStatus.message = "Пользователь не найден";
        }
      }
    )
  }
}
