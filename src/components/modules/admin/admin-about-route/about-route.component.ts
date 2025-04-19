import {MapComponent} from '../../../base/map/map.component';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouteService} from '../../../../services/RouteService';
import {RouteItem} from '../../../../data/RouteItem';
import {RouteExampleItem} from '../../../../data/RouteExampleItem';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs';
import {
  DefaultNavigationCardHeaderComponent
} from '../../default-components/default-navigation-card-header/default-navigation-card-header.component';
import {IHeaderNavigationItem} from '../../default-components/data/IHeaderNavigationItem';
import {CategoriesCardBodyComponent} from './components/categories-card-body/categories-card-body.component';
import {RouteCardBodyComponent} from './components/route-card-body/route-card-body.component';
import {RouteCardStatus} from './data/route-card.status';
import {AboutRouteNavigationBarStatus} from './data/about-route-navigation-bar.status';
import {RouteCategoriesService} from '../../../../services/RouteCategoriesService';
import {RouteCategoryItem} from '../../../../data/RouteCategoryItem';
import {CategoryItem} from '../../../../dto/CategoryItem';

@Component({
  selector: 'app-admin-about-route',
  imports: [
    MapComponent,
    NgIf,
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
    DefaultNavigationCardHeaderComponent,
    CategoriesCardBodyComponent,
    RouteCardBodyComponent,
  ],
  templateUrl: './about-route.component.html',
  styleUrl: './about-route.component.css'
})
export class AboutRouteComponent implements OnInit {
  routeItem: RouteItem | null = null;
  routeExamples: RouteExampleItem[] = [];
  routeCardStatus: RouteCardStatus = RouteCardStatus.None;
  routeId: number;
  navigationItems: IHeaderNavigationItem<AboutRouteNavigationBarStatus>[] = [
    {label: "Маршрут", value: AboutRouteNavigationBarStatus.Route},
    {label: "Категории маршрута", value: AboutRouteNavigationBarStatus.RouteCategories},
  ];
  currentNavigationBarStatus: AboutRouteNavigationBarStatus = AboutRouteNavigationBarStatus.Route;
  protected readonly RouteCardStatus = RouteCardStatus;
  protected readonly AboutRouteNavigationBarStatus = AboutRouteNavigationBarStatus;
  private routeService: RouteService;
  routeCategories: CategoryItem[] = [];
  allCategories: CategoryItem[] = [];

  constructor(
    private route: ActivatedRoute, routeService: RouteService,
    private router: Router, private cdr: ChangeDetectorRef,
    private routeCategoriesService: RouteCategoriesService) {
    this.routeService = routeService;
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit() {
    this.loadRoute();
    this.loadRouteExamples();
    this.loadCategories();
  }

  loadRoute() {
    this.routeService.getRoute(this.routeId).subscribe(
      {
        next: (next: RouteItem) => {
          this.routeItem = next;
          this.routeCategories = next.routeCategories;
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }

  loadRouteExamples() {
    this.routeService.getRouteExamples(this.routeId).pipe(tap(x => this.routeExamples = x)).subscribe({});
  }

  ToggleEditRouteCard() {
    switch (this.routeCardStatus) {
      case RouteCardStatus.None:
        this.routeCardStatus = RouteCardStatus.Editing;
        break;
      case RouteCardStatus.Editing:
        this.updateAboutRoute();
        this.routeCardStatus = RouteCardStatus.None;
        break
    }

    this.cdr.detectChanges();
  }

  updateAboutRoute() {
    if (this.routeItem != null) {
      this.routeItem.routeCategories = this.routeCategories;
      this.routeService.updateRoute(this.routeItem).pipe().subscribe(
        {
          next: (x) => this.routeItem = x,
          error: (error) => console.log("Не удалось обновить маршрут"),
          complete: () => {
          }
        }
      );
    }
  }

  goToRouteMap() {
    this.router.navigate(['/admin/routes', this.routeId, 'map'])
  }

  handleHeaderOnInitialized(navigationItem: IHeaderNavigationItem<string | number>) {
    this.changeCardBody(navigationItem);
  }

  handleChangeCardBody(navigationItem: IHeaderNavigationItem<string | number>) {
    this.changeCardBody(navigationItem);
  }

  changeCardBody(navigationItem: IHeaderNavigationItem<string | number>) {
    let item = navigationItem as IHeaderNavigationItem<AboutRouteNavigationBarStatus>;
    this.currentNavigationBarStatus = item.value;
  }

  private loadCategories() {
    this.routeCategoriesService.getAll()
      .subscribe(
        {
          next: (next: CategoryItem[]) => {
            this.allCategories = next;
          },
          error: err => {
            console.error(err);
          }
        }
      )
  }
}

