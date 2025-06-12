import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ICategory} from '../../../../../dto/ICategory';

@Component({
  selector: 'app-default-categories-catalogue',
    imports: [
        NgForOf
    ],
  templateUrl: './default-categories-catalog.component.html',
  styleUrl: './default-categories-catalog.component.css'
})
export class DefaultCategoriesCatalogueComponent {
  @Input()
  categories: ICategory[] = []

  @Output()
  onFilter: EventEmitter<string> = new EventEmitter<string>();

  navigateToRoutes(categoryTitle: string): void {
    this.onFilter.emit(categoryTitle);
  }
}
