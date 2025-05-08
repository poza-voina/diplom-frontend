import {Component, EventEmitter, Output} from '@angular/core';
import {FormFieldComponent} from "../../../base/form-field/form-field.component";
import {FormsModule} from "@angular/forms";
import {ICategoryItem} from '../../../../dto/ICategoryItem';
import {INewCategoryItem} from '../../../../dto/new-category-item.interface';
import {IRouteItem} from '../../../../data/IRouteItem';

@Component({
  selector: 'app-add-new-category',
    imports: [
        FormFieldComponent,
        FormsModule
    ],
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css'
})
export class AddNewCategoryComponent {
  categoryItem: INewCategoryItem = {title: ''};
  @Output() saveEvent: EventEmitter<INewCategoryItem> = new EventEmitter();
  @Output() afterSaveEvent = new EventEmitter<any>();

  saveHandler() {
    this.saveEvent.emit(this.categoryItem);
  }

  afterSaveHandler(error:string | null) {
    console.log("afterSaveHandler", error);
    if (error == null) {
      this.afterSaveEvent.emit();
    }
  }
}

