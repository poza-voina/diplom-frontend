import { Routes } from '@angular/router';
import {RoutesComponent} from '../components/routes/routes.component';
import {AboutRouteComponent} from '../components/about-route/about-route.component';
import {TestComponent} from '../components/test/test.component';
import {RouteMapComponent} from '../components/route-map/route-map.component';

export const routes: Routes = [
  {
    path: "admin/routes",
    component: RoutesComponent
  },
  {
    path: "admin/route/:routeId",
    component: AboutRouteComponent
  },
  {
    path: "admin/route/:routeId/map",
    component: RouteMapComponent
  },
  {
    path: "test",
    component: TestComponent
  },
];
