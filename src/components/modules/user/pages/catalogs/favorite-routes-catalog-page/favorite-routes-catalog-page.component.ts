import {Component, EventEmitter, OnInit} from '@angular/core';
import {DefaultCatalogueComponent} from '../../../components/default-catalog/default-catalog.component';
import { RouteItem } from '../../../../../../data/RouteItem';

@Component({
  selector: 'app-favorite-routes-catalog-page',
  imports: [
    DefaultCatalogueComponent
  ],
  templateUrl: './favorite-routes-catalog-page.component.html',
  styleUrl: './favorite-routes-catalog-page.component.css'
})
export class FavoriteRoutesCatalogPageComponent implements OnInit {
  routes: RouteItem[] = [];
  private loadCatalogEvent = new EventEmitter<string>();
  private header: string = "Избранные маршруты";

  ngOnInit(): void {
    this.loadCatalogEvent.emit(this.header);
  }
}
