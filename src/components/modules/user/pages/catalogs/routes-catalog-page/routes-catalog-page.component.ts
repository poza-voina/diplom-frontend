import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RouteService} from '../../../../../../services/route.service';
import {NgForOf, NgIf} from '@angular/common';
import {IGetVisibleRouteWithPaginate} from '../../../../../../dto/get-all-dto.interface';
import {IRouteWithAttachment} from '../../../../../../data/route/IBaseRoute';
import {S3Helper} from '../../../../../../services/s3.helper';
import {PagginationComponent} from '../../../../default-components/paggination/paggination.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-routes-catalog-page',
  imports: [
    NgForOf,
    NgIf,
    PagginationComponent
  ],
  templateUrl: './routes-catalog-page.component.html',
  styleUrl: './routes-catalog-page.component.css'
})
export class RoutesCatalogPageComponent implements OnInit {
  routes: IRouteWithAttachment[] = []
  header: string = "Маршруты";
  filter: string | null = null;

  @Output()
  loadCatalogEvent = new EventEmitter<string>();

  constructor(private routeService: RouteService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.loadAllData();
  }

  loadAllData(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filter = params.get('filter');
    })

    this.loadCatalogEvent.emit(this.header);

    let getRoutesDto: IGetVisibleRouteWithPaginate = {pageNumber: 1, pageSize: 10, category: this.filter};

    this.routeService.getVisibleRoutes(getRoutesDto).subscribe(
      {
        next: (routes: IRouteWithAttachment[]) => {
          this.routes = routes;
        },
        error: (error: Error) => console.log(error),
        complete: () => {
        }
      }
    )
  }

  getImage(uri: string | null) {
    if (uri === null) {
      return null;
    }
    return S3Helper.getImageUrlOrDefault(uri)
  }

  clearFilter() {
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true
    });

    this.loadAllData();
  }
}
