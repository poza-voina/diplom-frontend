import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DefaultCatalogueComponent} from '../../../components/default-catalog/default-catalog.component';
import { IRouteItem } from '../../../../../../data/IRouteItem';
import {RouteService} from '../../../../../../services/route.service';
import {RoutesFilter} from '../../../../admin/admin-routes/routesSort';
import {GetRoutesWithFiltersDto} from '../../../../../../dto/GetRoutesWithFiltersDto';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-routes-catalog-page',
  imports: [
    DefaultCatalogueComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './routes-catalog-page.component.html',
  styleUrl: './routes-catalog-page.component.css'
})
export class RoutesCatalogPageComponent implements OnInit {
  routes: IRouteItem[] = []
  header: string = "Маршруты";

  @Output()
  loadCatalogEvent = new EventEmitter<string>();

  constructor(private routeService: RouteService) {
  }

  ngOnInit(): void {
    console.log("RoutesCatalogPageComponent init");

    this.loadCatalogEvent.emit(this.header);

    let getRoutesDto: GetRoutesWithFiltersDto = new GetRoutesWithFiltersDto({pageNumber: 1, countPerPage: 10, filters: [RoutesFilter.ShowVisible]});
    this.routeService.getVisibleRoutes(getRoutesDto).subscribe(
      {
        next: (routes: IRouteItem[]) => {
          this.routes = routes;
        },
        error: (error: Error) => console.log(error),
        complete: () => {
        }
      }
    )
  }
}
