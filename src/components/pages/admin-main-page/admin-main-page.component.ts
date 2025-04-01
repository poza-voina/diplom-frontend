import {Component, OnInit} from '@angular/core';
import {AdminModule} from '../../modules/admin/admin.module';
import {RouterLink, Router, RouterOutlet} from '@angular/router';
import {BreadcrumbComponent} from '../../modules/admin/breadcrumb/breadcrumb.component';
import {NgIf} from '@angular/common';
import {AdminDashboardComponent} from '../../modules/admin/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-admin-main-page',
  imports: [
    AdminModule,
    RouterOutlet,
    BreadcrumbComponent,
    RouterLink,
    NgIf,
    AdminDashboardComponent
  ],
  templateUrl: './admin-main-page.component.html',
  styleUrl: './admin-main-page.component.css'
})
export class AdminMainPageComponent {

  constructor(private router : Router) { }

  isMain() {
    return this.router.url === '/admin/dashboard';
  }
}
