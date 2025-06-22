import {Component, HostListener} from '@angular/core';
import {BaseFormComponent, IField, ILink, ISubmitStatus, SubmitStatus} from '../../forms/base-form/base-form.component';
import {Validators} from '@angular/forms';
import {ClientAuthService} from '../../service/client-auth.service';
import {ILoginCredentials} from '../../../../../dto/login-credentials.interface';
import {IRegistrationUserDto} from '../../../../../dto/IRegistrationUserDto';
import {ClientService} from '../../../../../services/client.service';
import {IUserProfileDto} from '../../../../../dto/IUserProfileDto';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-profile-edit-page',
  imports: [
    BaseFormComponent,
    NgClass
  ],
  templateUrl: './profile-edit-page.component.html',
  styleUrl: './profile-edit-page.component.css'
})
export class ProfileEditPageComponent {
  submitLabel: string = "Изменить профиль";
  formLabel: string = "Изменить профиль"

  submitStatus: ISubmitStatus = {
    status: SubmitStatus.DEFAULT,
    message: null
  }
  links: ILink[] = [
    {label: "Войти", link: "/login"},
  ];
  initData: IUserProfileDto | null = null;
  containerClass = 'w-75';


  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getProfile().subscribe(
      {next: x => this.initData = x, error: x => {console.log(x)}, complete: () => console.log(this.initData)}
    )

    this.setContainerClass(window.innerWidth);
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

    this.clientService.updateProfile(registrationUser).subscribe({
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
}
