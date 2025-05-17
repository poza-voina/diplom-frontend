import { Component } from '@angular/core';
import {BaseFormComponent, IField, ILink} from "../../forms/base-form/base-form.component";
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
    imports: [
        BaseFormComponent
    ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent {
  fields: IField[] = [
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

  links: ILink[] = [
    {label: "Зарегистрироваться", link: "/registration"},
    {label: "Войти", link: "/login"},
  ];

  submitLabel: string = "Изменить пароль";
  formLabel: string = "Изменение пароля";

  handleFormSubmit($event: any) {

  }
}
