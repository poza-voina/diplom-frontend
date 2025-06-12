import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DatePipe, NgForOf} from '@angular/common';
import {AdminActionsService} from '../../../../services/admin-actions.service';
import {IGetPendingRoutesExamplesRequest, IRouteExampleWithRoute} from '../../../../data/IRouteExample';
import {PagginationComponent} from '../../default-components/paggination/paggination.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    PagginationComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  pendingRoutesExamples: IRouteExampleWithRoute[] = [];
  pendingRoutesExamplesByUser: IRouteExampleWithRoute[] = [];

  constructor(private adminActionsService: AdminActionsService, private router: Router) {
  }

  ngOnInit() {
    let pendingRoutesExamplesRequest: IGetPendingRoutesExamplesRequest = {
      isRouteExamplePending: true,
      isUserPending: false,
      pageNumber: 1,
      pageSize: 10,
    };
    let pendingRoutesExamplesByUserRequest: IGetPendingRoutesExamplesRequest = {
      isRouteExamplePending: false,
      isUserPending: true,
      pageNumber: 1,
      pageSize: 10,
    };

    this.adminActionsService.getFilteredRoutesExamples(pendingRoutesExamplesRequest)
      .subscribe(
        {
          next: value => this.pendingRoutesExamples = value,
          error: error => console.log("Не удалось загрузить экземпляры маршрутов")
        }
      );
    this.adminActionsService.getFilteredRoutesExamples(pendingRoutesExamplesByUserRequest)
      .subscribe(
        {
          next: value => this.pendingRoutesExamplesByUser = value,
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

  goToRoute(routeId: number) {
    this.router.navigate(['/admin', 'routes', routeId]);
  }

  goToRouteExample(routeId: number, routeExampleId: number) {
    this.router.navigate(['/admin', 'routes', routeId, 'examples', routeExampleId, 'records']);
  }

  protected readonly indexedDB = indexedDB;
}
