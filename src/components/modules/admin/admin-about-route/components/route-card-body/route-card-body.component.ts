import {ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CurrencyPipe, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';
import {RouteCardStatus} from '../../data/route-card.status';
import {ModalWindowComponent} from '../../../../../base/modal-window/modal-window.component';
import {IBaseRoute, IRouteWithAttachment} from '../../../../../../data/route/IBaseRoute';

@Component({
  selector: 'app-route-card-body',
  imports: [
    NgSwitchCase,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgSwitch,
    ModalWindowComponent,
    CurrencyPipe
  ],
  templateUrl: './route-card-body.component.html',
  styleUrl: './route-card-body.component.css'
})
export class RouteCardBodyComponent {
  @Input() routeItem?: IBaseRoute;
  @Input() routeCardStatus!: RouteCardStatus;
  @Output() routeItemChange = new EventEmitter<IRouteWithAttachment | null>();
  @Output() routeCardStatusChange = new EventEmitter<RouteCardStatus>();

  protected readonly RouteCardStatus = RouteCardStatus;

  constructor(private cdr: ChangeDetectorRef) {
  }

  @ViewChild('routeForm') form!: NgForm;
  formSubmitted: boolean = false;


  handleSave(): boolean {
    this.formSubmitted = true;
    if (!this.form) {
      console.warn('Форма не найдена!');
      return false;
    }

    this.form.control.markAllAsTouched();
    this.cdr.detectChanges();  // принудительно обновляем представление

    if (this.form.invalid) {
      console.log('Форма содержит ошибки');
      return false;
    }

    console.log('Форма валидна, данные:', this.routeItem);
    return true;
  }
}
