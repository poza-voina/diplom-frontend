import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-categories-page',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {
  categories = [
    {
      id: 1,
      name: 'Музеи',
      count: 1,
      editingStatus: EditingStatus.DEFAULT
    },
    {
      id: 2,
      name: 'Памятники архитектуры',
      count: 1,
      editingStatus: EditingStatus.DEFAULT
    }
  ];
  EditingStatus = EditingStatus;

  handleEdit(index: number) {
    this.categories[index].editingStatus = EditingStatus.EDITING;
  }

  handleSave(index: number) {
    // логика сохранения (API или локальное)
    this.categories[index].editingStatus = EditingStatus.DEFAULT;
  }

  handleSaveAll() {
    this.categories.forEach(cat => {
      if (cat.editingStatus === EditingStatus.EDITING) {
        // логика сохранения
        cat.editingStatus = EditingStatus.DEFAULT;
      }
    });
  }
}


enum EditingStatus {
  DEFAULT,
  EDITING
}
