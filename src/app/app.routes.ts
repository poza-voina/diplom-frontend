import {Routes} from '@angular/router';
import {AdminMainPageComponent} from '../components/pages/admin-main-page/admin-main-page.component';
import {RoutesComponent} from '../components/modules/admin/admin-routes/routes.component';
import {AboutRouteComponent} from '../components/modules/admin/admin-about-route/about-route.component';
import {RouteMapComponent} from '../components/modules/admin/admin-route-map/route-map.component';
import {AdminDashboardComponent} from '../components/modules/admin/admin-dashboard/admin-dashboard.component';
import {TestComponent} from '../components/test/test.component';

export const routes: Routes = [
  {path: 'test', component: TestComponent},
  {
    path: 'admin',
    component: AdminMainPageComponent,
    data:
      {
        breadcrumb: 'Администрационная панель'
      },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        data:
          {
            breadcrumb: null,
            parent: AdminMainPageComponent,
          }
      },
      {
        path: 'routes/:routeId/map',
        component: RouteMapComponent,
        data:
          {
            breadcrumb: 'Карта',
            parent: AboutRouteComponent,
          }
      },
      {
        path: 'routes',
        component: RoutesComponent,
        data:
          {
            breadcrumb: 'Маршруты',
            parent: AdminMainPageComponent,
          },
      },
      {
        path: 'routes/:routeId',
        component: AboutRouteComponent,
        data:
          {
            breadcrumb: 'Общая информация',
            parent: RoutesComponent,
          }
      }
    ]
  }
];
