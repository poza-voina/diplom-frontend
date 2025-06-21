import {Routes} from '@angular/router';
import {TestComponent} from '../components/test/test.component';
import {MainPageComponent} from '../components/modules/user/pages/main-page/main-page.component';
import {MainWrapperComponent} from '../components/modules/user/wrappers/main-wrapper/main-wrapper.component';
import {
  UserRegistrationPageComponent
} from '../components/modules/user/pages/registration-page/user-registration-page.component';
import {
  UserAuthorizationPageComponent
} from '../components/modules/user/pages/authorization-page/user-authorization-page.component';
import {AdminMainPageComponent} from '../components/pages/admin-main-page/admin-main-page.component';
import {AdminDashboardComponent} from '../components/modules/admin/admin-dashboard/admin-dashboard.component';
import {AboutRouteComponent} from '../components/modules/admin/admin-about-route/about-route.component';
import {RoutesComponent} from '../components/modules/admin/admin-routes/routes.component';
import {RouteMapComponent} from '../components/modules/admin/admin-route-map/route-map.component';
import {CatalogWrapperComponent} from '../components/modules/user/wrappers/catalog-wrapper/catalog-wrapper.component';
import {
  RoutesCatalogPageComponent
} from '../components/modules/user/pages/catalogs/routes-catalog-page/routes-catalog-page.component';
import {
  RoutesCategoriesCatalogPageComponent
} from '../components/modules/user/pages/catalogs/routes-categories-catalog-page/routes-categories-catalog-page.component';
import {
  AdminRoutesCategoriesComponent
} from '../components/modules/admin/admin-routes-categories/admin-routes-categories.component';
import {TestUserExampleComponent} from '../components/test-user-example/test-user-example.component';
import {
  AuthorizationPageComponent
} from '../components/modules/admin/pages/authorization-page/authorization-page.component';
import {RouteComponent} from '../components/modules/user/pages/route/route.component';
import {ProfilePageComponent} from '../components/modules/user/pages/profile-page/profile-page.component';
import {
  ResetPasswordPageComponent
} from '../components/modules/user/pages/reset-password-page/reset-password-page.component';
import {
  PasswordRecoveryPageComponent
} from '../components/modules/user/pages/password-recovery-page/password-recovery-page.component';
import {
  RouteExampleRecordsComponent
} from '../components/modules/admin/pages/route-example-records/route-example-records.component';
import {ProfileEditPageComponent} from '../components/modules/user/pages/profile-edit-page/profile-edit-page.component';
import {CategoriesPageComponent} from '../components/modules/admin/pages/categories-page/categories-page.component';

export const routes: Routes = [
  {path: 'test1', component: TestComponent},
  {path: 'test2', component: TestUserExampleComponent},
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '',
    component: MainWrapperComponent,
    children: [
      {
        path: "registration",
        component: UserRegistrationPageComponent,
      },
      {
        path: "login",
        component: UserAuthorizationPageComponent,
      },
      {
        path: "reset-password",
        component: ResetPasswordPageComponent,
      },
      {
        path: "recovery-password",
        component: PasswordRecoveryPageComponent,
      },
      {
        path: "route/:routeId",
        component: RouteComponent,
      },
      {
        path: "profile",
        component: ProfilePageComponent
      },
      {
        path: "profile/edit",
        component: ProfileEditPageComponent
      }
    ]
  },
  {
    path: 'routes',
    component: MainWrapperComponent,
    children: [
      {
        path: '', component: CatalogWrapperComponent,
        children: [
          {
            path: '',
            component: RoutesCatalogPageComponent,
          },
          {
            path: 'categories',
            component: RoutesCategoriesCatalogPageComponent,
          },
        ]
      },
    ]
  },
  {
    path: "admin/auth",
    component: AuthorizationPageComponent
  },
  {
    path: 'admin',
    component: AdminMainPageComponent,
    data:
      {
        breadcrumb: 'Панель администратора'
      },
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
        data:
          {
            breadcrumb: '',
            parent: AdminMainPageComponent,
          }
      },
      {
        path: 'categories',
        component: CategoriesPageComponent,
        data:
          {
            breadcrumb: "Категории маршрутов",
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
        path: 'routes/new',
        component: AboutRouteComponent,
        data:
          {
            breadcrumb: 'Общая информация',
            parent: RoutesComponent,
            isCreate: true,
          }
      },
      {
        path: 'routes/:routeId',
        component: AboutRouteComponent,
        data:
          {
            breadcrumb: 'Общая информация',
            parent: RoutesComponent,
          }
      },
      {
        path: 'routes/:routeId/examples/:exampleId/records',
        component: RouteExampleRecordsComponent,
        data:
          {
            breadcrumb: 'Записи на маршрут',
            parent: AboutRouteComponent,
          }
      }
    ]
  }
];
