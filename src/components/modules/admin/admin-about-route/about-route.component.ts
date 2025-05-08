import {MapComponent} from '../../../base/map/map.component';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouteService} from '../../../../services/route.service';
import {IRouteItem} from '../../../../data/IRouteItem';
import {IRouteExampleItem} from '../../../../data/IRouteExampleItem';
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
import {RouteCategoriesService} from '../../../../services/route-categories.service';
import {RouteCategoryItem} from '../../../../data/RouteCategoryItem';
import {ICategoryItem} from '../../../../dto/ICategoryItem';
import {AdminActionsService} from '../../../../services/admin-actions.service';
import {RouteExamplesTableComponent} from '../components/route-examples-table/route-examples-table.component';
import {ModalWindowComponent} from '../../../base/modal-window/modal-window.component';
import {AddNewCategoryComponent} from '../add-new-category/add-new-category.component';
import {NewRouteFormComponent} from '../../../forms/new-route-form/new-route-form.component';
import {INewCategoryItem} from '../../../../dto/new-category-item.interface';
import * as bootstrap from 'bootstrap';

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
    RouteExamplesTableComponent,
    ModalWindowComponent,
    AddNewCategoryComponent,
    NewRouteFormComponent,
  ],
  templateUrl: './about-route.component.html',
  styleUrl: './about-route.component.css'
})
export class AboutRouteComponent implements OnInit {
  routeItem: IRouteItem | null = null;
  routeCardStatus: RouteCardStatus = RouteCardStatus.None;
  routeId: number;
  navigationItems: IHeaderNavigationItem<AboutRouteNavigationBarStatus>[] = [
    {label: "Маршрут", value: AboutRouteNavigationBarStatus.Route},
    {label: "Категории маршрута", value: AboutRouteNavigationBarStatus.RouteCategories},
  ];
  currentNavigationBarStatus: AboutRouteNavigationBarStatus = AboutRouteNavigationBarStatus.Route;
  protected readonly RouteCardStatus = RouteCardStatus;
  protected readonly AboutRouteNavigationBarStatus = AboutRouteNavigationBarStatus;
  routeCategories: ICategoryItem[] = [];
  allCategories: ICategoryItem[] = [];
  addNewCategoryModelId: string = "addNewCategoryModel1";

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
    private adminActionsService: AdminActionsService,
    private router: Router, private cdr: ChangeDetectorRef,
    private routeCategoriesService: RouteCategoriesService) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit() {
    this.loadRoute();
    this.loadCategories();
  }

  loadRoute() {
    this.routeService.getRoute(this.routeId).subscribe(
      {
        next: (next: IRouteItem) => {
          this.routeItem = next;
          this.routeCategories = next.routeCategories;
        },
        error: err => {
          console.error(err);
        }
      }
    )
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
      this.adminActionsService.updateRoute(this.routeItem).pipe().subscribe(
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
          next: (next: ICategoryItem[]) => {
            this.allCategories = next;
          },
          error: err => {
            console.error(err);
          }
        }
      )
  }

  createNewCategory($event: INewCategoryItem) {

  }

  openModal(modalId: string): void {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal(modalId: string): void {
    console.log("closeModal", modalId);
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }
}

