import {Component, EventEmitter, Output} from '@angular/core';
import {FormFieldComponent} from "../../../base/form-field/form-field.component";
import {FormsModule} from "@angular/forms";
import {ICategory} from '../../../../dto/ICategory';
import {INewCategoryRequest} from '../../../../dto/new-category-item.interface';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-add-new-category',
  imports: [
    FormFieldComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './add-new-category.component.html',
  styleUrl: './add-new-category.component.css'
})
export class AddNewCategoryComponent {
  categoryItem: INewCategoryRequest = {title: ''};
  @Output() saveEvent: EventEmitter<INewCategoryRequest> = new EventEmitter();
  @Output() afterSaveEvent = new EventEmitter<any>();
  isError: boolean = false;

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

