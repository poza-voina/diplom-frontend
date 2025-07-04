import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

// Типы полей (можно дополнить по необходимости)
type FieldType = 'text' | 'email' | 'password' | 'tel' | 'textarea';

export interface IField {
  label: string;
  type: FieldType;
  name: string;
  required: boolean;
  validators: Validators[];
  errorMessages: { [key: string]: string };
}

export interface ILink {
  label: string;
  link: string;
}

@Component({
  selector: 'app-base-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css'
})
export class BaseFormComponent implements OnInit {
  @Input() fields: IField[] = [];
  @Input() links: ILink[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  formGroup!: FormGroup;
  @Input()
  submitLabel!: string;
  @Input()
  formLabel!: string;
  @Input() submitStatus: ISubmitStatus;
  @Input() initialData: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const controls = this.createControls();
    this.formGroup = this.fb.group(controls);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialData'] && this.formGroup) {
      this.formGroup.patchValue(this.initialData);
    }
  }

  // Создание формы на основе полей
  createControls(): { [key: string]: any } {
    const controls: { [key: string]: any } = {};  // Явно указываем тип
    this.fields.forEach(field => {
      controls[field.name] = ['', field.validators];  // Доступ к полю с name, которое точно есть
    });
    return controls;
  }

  // Получение ошибок для конкретного поля
  errorMessage: string | null = null;
  getControlErrors(controlName: string): string[] {
    const control = this.formGroup.get(controlName);
    if (!control || !control.errors || !control.touched) return [];
    return Object.keys(control.errors).map(errorKey => {
      return this.fields.find(field => field.name === controlName)?.errorMessages[errorKey] || 'Ошибка';
    });
  }

  onSubmit() {
    this.formSubmit.emit(this.formGroup.value)
  }

  protected readonly SubmitStatus = SubmitStatus;
}

export interface ISubmitStatus {
  status: SubmitStatus;
  message: string | null;
}

export enum SubmitStatus {
  DEFAULT,
  SUCCESS,
  PENDING,
  ERROR
}

