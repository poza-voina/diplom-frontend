import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DefaultCatalogueComponent} from '../../../components/default-catalog/default-catalog.component';
import { RouteItem } from '../../../../../../data/RouteItem';
import {RouteService} from '../../../../../../services/RouteService';
import {GetRoutesDto} from '../../../../../../services/GetRoutesDto';
import {RoutesFilter} from '../../../../admin/admin-routes/routesSort';

@Component({
  selector: 'app-routes-catalog-page',
  imports: [
    DefaultCatalogueComponent
  ],
  templateUrl: './routes-catalog-page.component.html',
  styleUrl: './routes-catalog-page.component.css'
})
export class RoutesCatalogPageComponent implements OnInit {
  routes: RouteItem[] = []
  header: string = "Маршруты";

  @Output()
  loadCatalogEvent = new EventEmitter<string>();

  constructor(private routeService: RouteService) {
  }

  ngOnInit(): void {
    console.log("RoutesCatalogPageComponent init");

    this.loadCatalogEvent.emit(this.header);

    let getRoutesDto: GetRoutesDto = new GetRoutesDto({pageNumber: 1, countPerPage: 10, filters: [RoutesFilter.ShowVisible]});
    this.routeService.getRoutes(getRoutesDto).subscribe(
      {
        next: (routes: RouteItem[]) => {
          this.routes = routes;
        },
        error: (error: Error) => console.log(error),
        complete: () => {
        }
      }
    )
  }
}
