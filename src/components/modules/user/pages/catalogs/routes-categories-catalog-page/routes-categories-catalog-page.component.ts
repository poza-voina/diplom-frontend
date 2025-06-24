import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  DefaultCategoriesCatalogueComponent
} from '../../../components/default-categories-catalog/default-categories-catalog.component';
import {RouteCategoryItem} from '../../../../../../data/RouteCategoryItem';
import {RouteCategoriesService} from '../../../../../../services/route-categories.service';
import { ICategory } from '../../../../../../dto/ICategory';
import {Router} from '@angular/router';


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
  categories: ICategory[] = [];
  isNotFound: boolean = false;

  constructor(private service: RouteCategoriesService, private router: Router) {
  }

  ngOnInit(): void {
   this.loadCatalogEvent.emit(this.header);
   this.loadCategories();
  }

  private loadCategories() {
    this.service.getAll().subscribe({
      next: next => {
        this.categories = next;
        this.isNotFound = this.categories.length === 0;
      },
      error: err => {
        console.error(err);
        this.isNotFound = true;
      }
    })
  }

  onFilterHandle(categoryTitle: string) {
    this.router.navigate(
      ['/', 'routes'],
      {
        queryParams: {
          filter: categoryTitle
        },
        queryParamsHandling: 'merge', // сохранить другие параметры (если нужно)
        replaceUrl: true // опционально, чтобы не добавлять в историю браузера
      }
    );
  }
}
