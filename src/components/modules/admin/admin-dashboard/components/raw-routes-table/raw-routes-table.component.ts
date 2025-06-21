import {Component, OnInit} from '@angular/core';
import {IGetPendingRoutesExamplesRequest, IRouteExampleWithRoute} from '../../../../../../data/IRouteExample';
import {AdminActionsService} from '../../../../../../services/admin-actions.service';
import {Router} from '@angular/router';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {PagginationComponent} from '../../../../default-components/paggination/paggination.component';

@Component({
  selector: 'app-raw-routes-table',
  imports: [
    DatePipe,
    PagginationComponent,
    NgIf,
    NgForOf
  ],
  templateUrl: './raw-routes-table.component.html',
  styleUrl: './raw-routes-table.component.css'
})
export class RawRoutesTableComponent implements OnInit {
  pendingRoutesExamplesByUser: IRouteExampleWithRoute[] = [];

  constructor(private adminActionsService: AdminActionsService, private router: Router) {
  }

  ngOnInit() {
    this.loadRoutes();
  }

  loadRoutes() {
    let pendingRoutesExamplesByUserRequest: IGetPendingRoutesExamplesRequest = {
      isRouteExamplePending: false,
      isUserPending: true,
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
    };

    this.adminActionsService.getFilteredRoutesExamples(pendingRoutesExamplesByUserRequest)
      .subscribe(
        {
          next: data => {
            this.pendingRoutesExamplesByUser = data.values;
            this.totalPages = data.totalPages;
          },
          error: error => console.log("Не удалось загрузить экземпляры маршрутов")
        }
      );
  }

  getStatusDescription(status: string) : string {
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

  goToRouteExample(routeId: number, routeExampleId: number) {
    this.router.navigate(['/admin', 'routes', routeId, 'examples', routeExampleId, 'records']);
  }

  protected readonly indexedDB = indexedDB;
  totalPages: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadRoutes();
  }
}
