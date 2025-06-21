import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {AdminActionsService} from '../../../../services/admin-actions.service';
import {IGetPendingRoutesExamplesRequest, IRouteExampleWithRoute} from '../../../../data/IRouteExample';
import {PagginationComponent} from '../../default-components/paggination/paggination.component';
import {GetRoutesWithFiltersDto} from '../../../../dto/GetRoutesWithFiltersDto';
import {ICollectionDto} from '../../../../data/ICollection';
import {IRouteWithAttachment} from '../../../../data/route/IBaseRoute';
import {OpenRoutesTableComponent} from './components/open-routes-table/open-routes-table.component';
import {RawRoutesTableComponent} from './components/raw-routes-table/raw-routes-table.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    RouterLink,
    NgForOf,
    DatePipe,
    PagginationComponent,
    NgIf,
    OpenRoutesTableComponent,
    RawRoutesTableComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {}
