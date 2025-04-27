import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  DefaultCategoriesCatalogueComponent
} from '../../../components/default-categories-catalog/default-categories-catalog.component';
import {RouteCategoryItem} from '../../../../../../data/RouteCategoryItem';
import {RouteCategoriesService} from '../../../../../../services/route-categories.service';
import { CategoryItem } from '../../../../../../dto/CategoryItem';

@Component({
  selector: 'app-routes-categories-catalog-page',
  imports: [
    DefaultCategoriesCatalogueComponent
  ],
  templateUrl: './routes-categories-catalog-page.component.html',
  styleUrl: './routes-categories-catalog-page.component.css'
})
export class RoutesCategoriesCatalogPageComponent implements OnInit {
  header: string = "Категории маршрутов";
  @Output()
  loadCatalogEvent = new EventEmitter<string>();
  categories: CategoryItem[] = [];

  constructor(private service: RouteCategoriesService) {
  }

  ngOnInit(): void {
   this.loadCatalogEvent.emit(this.header);
   this.loadCategories();
  }

  private loadCategories() {
    this.service.getAll().subscribe({
      next: next => {
        this.categories = next;
      },
      error: err => {
        console.error(err);
      }
    })
  }
}
