import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  DefaultCategoriesCatalogueComponent
} from '../../../components/default-categories-catalog/default-categories-catalog.component';

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

  ngOnInit(): void {
   this.loadCatalogEvent.emit(this.header);
  }

}
