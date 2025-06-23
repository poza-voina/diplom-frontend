import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminModule} from '../../modules/admin/admin.module';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {BreadcrumbComponent} from '../../modules/admin/breadcrumb/breadcrumb.component';
import {NgIf} from '@angular/common';
import {AdminDashboardComponent} from '../../modules/admin/admin-dashboard/admin-dashboard.component';
import {BaseAuthService} from '../../../services/base-auth.service';
import {AdminAuthService} from '../../modules/admin/services/admin-auth.service';

@Component({
  selector: 'app-admin-main-page',
  imports: [
    AdminModule,
    RouterOutlet,
    BreadcrumbComponent,
    NgIf,
    AdminDashboardComponent,
    RouterLink
  ],
  templateUrl: './admin-main-page.component.html',
  styleUrl: './admin-main-page.component.css'
})
export class AdminMainPageComponent implements OnInit {
  constructor(private router: Router, private authService: AdminAuthService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.check()
  }

  isMain() {
    return this.router.url === '/admin/dashboard';
  }

  check() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/auth']).then(r => {
        console.log('Маршрутизация выполнена', r);
      }).catch(error => {
        console.log('Ошибка маршрутизации', error);
      });
    }
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.removeToken();
    this.check();
  }
}
