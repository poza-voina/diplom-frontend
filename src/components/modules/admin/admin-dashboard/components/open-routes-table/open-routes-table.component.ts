import {Component, OnInit} from '@angular/core';
import {PagginationComponent} from '../../../../default-components/paggination/paggination.component';
import {IGetPendingRoutesExamplesRequest, IRouteExampleWithRoute} from '../../../../../../data/IRouteExample';
import {AdminActionsService} from '../../../../../../services/admin-actions.service';
import {Router} from '@angular/router';
import {GetRoutesWithFiltersDto} from '../../../../../../dto/GetRoutesWithFiltersDto';
import {ICollectionDto} from '../../../../../../data/ICollection';
import {IRouteWithAttachment} from '../../../../../../data/route/IBaseRoute';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-open-routes-table',
  imports: [
    PagginationComponent,
    DatePipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './open-routes-table.component.html',
  styleUrl: './open-routes-table.component.css'
})
export class OpenRoutesTableComponent implements OnInit {

  pendingRoutesExamples: IRouteExampleWithRoute[] = [];

  constructor(private adminActionsService: AdminActionsService, private router: Router) {
  }

  ngOnInit() {
    this.loadRoutes();
  }

  getStatusDescription(status: string): string {
    switch (status) {
      case "Pending":
        return "Ожидает записи";
      case "Closed":
        return "Закрыто получение записей";
      default:
        console.warn("Нет такого статуса");
        throw new Error("Нет такого статуса");
    }
  }

  goToRoute(routeId: number, routeExampleId: number) {
    this.router.navigate(['/admin', 'routes', routeId],  { queryParams: { routeExampleId: routeExampleId } });
  }

  protected readonly indexedDB = indexedDB;
  totalPages: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadRoutes();
  }

  loadRoutes() {
    let pendingRoutesExamplesRequest: IGetPendingRoutesExamplesRequest = {
      isRouteExamplePending: true,
      isUserPending: false,
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
    };

    this.adminActionsService.getFilteredRoutesExamples(pendingRoutesExamplesRequest)
      .subscribe(
        {
          next: data => {
            this.pendingRoutesExamples = data.values;
            this.totalPages = data.totalPages;
          },
          error: error => console.log("Не удалось загрузить экземпляры маршрутов")
        }
      );
  }
}
