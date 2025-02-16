import {Component, EventEmitter, Output} from '@angular/core';
import {FormFieldComponent} from '../../base/form-field/form-field.component';
import {RouteItem} from '../../../data/RouteItem';
import {FormsModule} from '@angular/forms';

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
  @Output() saveEvent: EventEmitter<RouteItem> = new EventEmitter();
  @Output() afterSaveEvent: EventEmitter<null> = new EventEmitter();
  routeItem: RouteItem = <RouteItem>{title: "", isHidden: true}
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
