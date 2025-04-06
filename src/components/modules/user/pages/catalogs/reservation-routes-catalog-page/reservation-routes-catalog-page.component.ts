import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DefaultCatalogueComponent} from '../../../components/default-catalog/default-catalog.component';
import { RouteItem } from '../../../../../../data/RouteItem';

@Component({
  selector: 'app-reservation-routes-catalog-page',
  imports: [
    DefaultCatalogueComponent
  ],
  templateUrl: './reservation-routes-catalog-page.component.html',
  styleUrl: './reservation-routes-catalog-page.component.css'
})
export class ReservationRoutesCatalogPageComponent implements OnInit {
  routes: RouteItem[] = [];

  header: string = "Заброннированные маршруты";

  @Output()
  loadCatalogEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.loadCatalogEvent.emit(this.header);
  }
}
