import { Component } from '@angular/core';
import {BaseFormComponent, IField, ILink} from '../../forms/base-form/base-form.component';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-password-recovery-page',
  imports: [
    BaseFormComponent
  ],
  templateUrl: './password-recovery-page.component.html',
  styleUrl: './password-recovery-page.component.css'
})
export class PasswordRecoveryPageComponent {
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
    }]

  links: ILink[] = [
    {label: "Зарегистрироваться", link: "/registration"},
    {label: "Войти", link: "/login"},
  ];

  submitLabel: string = "Отправить ссылку";
  formLabel: string = "Восстановление пароля";

  handleFormSubmit($event: any) {

  }
}
