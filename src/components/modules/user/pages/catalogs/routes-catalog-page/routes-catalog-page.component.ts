import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RouteService} from '../../../../../../services/route.service';
import {NgForOf, NgIf} from '@angular/common';
import {IGetVisibleRouteWithPaginate} from '../../../../../../dto/get-all-dto.interface';
import {IRouteWithAttachment} from '../../../../../../data/route/IBaseRoute';
import {S3Helper} from '../../../../../../services/s3.helper';
import {PagginationComponent} from '../../../../default-components/paggination/paggination.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ICollectionDto} from '../../../../../../data/ICollection';
import * as repl from 'node:repl';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-routes-catalog-page',
  imports: [
    NgForOf,
    NgIf,
    PagginationComponent,
    FormsModule
  ],
  templateUrl: './routes-catalog-page.component.html',
  styleUrl: './routes-catalog-page.component.css'
})
export class RoutesCatalogPageComponent implements OnInit {
  routes: IRouteWithAttachment[] = []
  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;
  searchText: string = '';
  header: string = "Маршруты";
  filter: string | null = null;

  @Output()
  loadCatalogEvent = new EventEmitter<string>();

  constructor(private routeService: RouteService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.filter = params.get('filter');
    })
    this.loadAllData();
  }

  loadAllData(): void {
    this.loadCatalogEvent.emit(this.header);

    let getRoutesDto: IGetVisibleRouteWithPaginate = {
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      category: this.filter,
      title: this.searchText
    };

    this.routeService.getVisibleRoutes(getRoutesDto).subscribe(
      {
        next: (data: ICollectionDto<IRouteWithAttachment>) => {
          this.routes = data.values;
          this.totalPages = data.totalPages;
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

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAllData();
  }

  onButtonSearchClick() {
    this.loadAllData();
  }

  onClearSearch() {
    this.searchText = '';
    this.loadAllData();
  }

  clearFilter() {
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true
    });

    this.filter = null;

    this.loadAllData();
  }
}
