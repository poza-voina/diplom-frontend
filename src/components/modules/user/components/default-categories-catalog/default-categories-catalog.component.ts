import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CategoryItem} from '../../../../../dto/CategoryItem';

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
  categories: CategoryItem[] = []
}
