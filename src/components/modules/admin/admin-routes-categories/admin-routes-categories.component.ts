import {Component, OnInit} from '@angular/core';
import { RouteCategoriesService } from '../../../../services/RouteCategoriesService';

@Component({
  selector: 'app-admin-routes-categories',
  imports: [],
  templateUrl: './admin-routes-categories.component.html',
  styleUrl: './admin-routes-categories.component.css'
})
export class AdminRoutesCategoriesComponent implements OnInit {
  constructor(private routeCategoriesService: RouteCategoriesService) {  }

  ngOnInit(): void {

  }
}
