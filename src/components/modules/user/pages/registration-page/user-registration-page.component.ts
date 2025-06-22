import {Component, HostListener, ViewChild} from '@angular/core';
import {UserModule} from '../../user.module';
import {BaseFormComponent, IField, ILink, ISubmitStatus, SubmitStatus} from '../../forms/base-form/base-form.component';
import {Validators} from '@angular/forms';
import {IRegistrationUserDto} from '../../../../../dto/IRegistrationUserDto';
import {ClientAuthService} from '../../service/client-auth.service';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-registration-page',
  templateUrl: './user-registration-page.component.html',
  standalone: true,
  imports: [
    UserModule,
    BaseFormComponent,
    NgClass,
    NgIf
  ],
  styleUrl: './user-registration-page.component.css'
})
export class UserRegistrationPageComponent {
  submitLabel: string = "Зарегистрироваться";
  formLabel: string = "Создайте учетную запись"

  submitStatus: ISubmitStatus = {
    status: SubmitStatus.DEFAULT,
    message: null
  }
  links: ILink[] = [
    {label: "Войти", link: "/login"},
  ];
  containerClass = 'w-75';

  ngOnInit() {
    this.setContainerClass(window.innerWidth);
  }

  constructor(private authClientService: ClientAuthService) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setContainerClass(event.target.innerWidth);
  }

  setContainerClass(width: number) {
    this.containerClass = width <= 800 ? 'w-95' : 'w-75';
  }

  handleFormSubmit(event: any) {
    this.submitStatus.status = SubmitStatus.PENDING;
    let registrationUser: IRegistrationUserDto = {
      email: null,
      firstName: null,
      secondName: null,
      patronymic: null,
      phoneNumber: null,
      repeatPassword: null,
      password: null
    };

    registrationUser = event;


    this.authClientService.register(registrationUser).subscribe({
      next: (response) => {
        this.submitStatus.status = SubmitStatus.SUCCESS;
        window.history.back();
      },
      error: (err) => {
        this.submitStatus.status = SubmitStatus.ERROR;
        this.submitStatus.message = "Такой пользователь существует";
      }
    });
  }

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
      label: 'Имя',
      name: 'firstName',
      type: 'text',
      required: true,
      validators: [Validators.required],
      errorMessages: {
        required: 'Имя обязательно'
      }
    },
    {
      label: 'Фамилия',
      name: 'secondName',
      type: 'text',
      required: true,
      validators: [Validators.required],
      errorMessages: {
        required: 'Фамилия обязательна'
      }
    },
    {
      label: 'Отчество',
      name: 'patronymic',
      type: 'text',
      required: false,
      validators: [],
      errorMessages: {}
    },
    {
      label: 'Телефон',
      name: 'phoneNumber',
      type: 'tel',
      required: true,
      validators: [Validators.required, Validators.pattern(/\+?[0-9\s\-()]{10,}/)],
      errorMessages: {
        required: 'Телефон обязателен',
        pattern: 'Неверный формат телефона'
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
    },
    {
      label: 'Повторите пароль',
      name: 'repeatPassword',
      type: 'password',
      required: true,
      validators: [Validators.required],
      errorMessages: {
        required: 'Повторите пароль'
      }
    }
  ];
  isError: boolean = false;
}
