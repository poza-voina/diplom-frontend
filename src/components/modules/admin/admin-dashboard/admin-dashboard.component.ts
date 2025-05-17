import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
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

  constructor(private adminActionsService: AdminActionsService) {
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
}
