import {Component, EventEmitter, Output} from '@angular/core';
import {FormFieldComponent} from '../../base/form-field/form-field.component';
import {FormsModule} from '@angular/forms';
import {IBaseRoute} from '../../../data/route/IBaseRoute';

@Component({
  selector: 'new-route-form',
  imports: [
    FormFieldComponent,
    FormsModule
  ],
  templateUrl: './new-route-form.component.html',
  styleUrl: './new-route-form.component.css'
})
export class NewRouteFormComponent {
  @Output() saveEvent: EventEmitter<IBaseRoute> = new EventEmitter();
  @Output() afterSaveEvent: EventEmitter<null> = new EventEmitter();
  routeItem: IBaseRoute = <IBaseRoute>{title: "", isHidden: true}
  error: string | null = null;

  saveHandler() {
    this.saveEvent.emit(this.routeItem);
  }

  afterSaveHandler(error:string | null) {
    console.log("afterSaveHandler", error);
    if (error == null) {
      this.afterSaveEvent.emit();
    }
    this.error = error;
  }
}
