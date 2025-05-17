import {MapComponent} from '../../../base/map/map.component';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouteService} from '../../../../services/route.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  DefaultNavigationCardHeaderComponent
} from '../../default-components/default-navigation-card-header/default-navigation-card-header.component';
import {IHeaderNavigationItem} from '../../default-components/data/IHeaderNavigationItem';
import {CategoriesCardBodyComponent} from './components/categories-card-body/categories-card-body.component';
import {RouteCardBodyComponent} from './components/route-card-body/route-card-body.component';
import {RouteCardStatus} from './data/route-card.status';
import {AboutRouteNavigationBarStatus} from './data/about-route-navigation-bar.status';
import {RouteCategoriesService} from '../../../../services/route-categories.service';
import {ICategory} from '../../../../dto/ICategory';
import {AdminActionsService} from '../../../../services/admin-actions.service';
import {RouteExamplesTableComponent} from '../components/route-examples-table/route-examples-table.component';
import {INewCategoryRequest} from '../../../../dto/new-category-item.interface';
import * as bootstrap from 'bootstrap';
import {UploadImageCardBodyComponent} from './components/upload-image-card-body/upload-image-card-body.component';
import {AttachmentService} from '../../../../services/attachment.service';
import {IBaseRoute, IRouteWithAttachment} from '../../../../data/route/IBaseRoute';

@Component({
  selector: 'app-admin-about-route',
  imports: [
    MapComponent,
    NgIf,
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    DefaultNavigationCardHeaderComponent,
    CategoriesCardBodyComponent,
    RouteCardBodyComponent,
    RouteExamplesTableComponent,
    UploadImageCardBodyComponent,
  ],
  templateUrl: './about-route.component.html',
  styleUrl: './about-route.component.css'
})
export class AboutRouteComponent implements OnInit {
  routeItem: IRouteWithAttachment | null = null;
  routeCardStatus: RouteCardStatus = RouteCardStatus.None;
  routeId: number;
  isCreate: boolean = false;
  navigationItems: IHeaderNavigationItem<AboutRouteNavigationBarStatus>[] = [
    {label: "Маршрут", value: AboutRouteNavigationBarStatus.Route},
    {label: "Категории маршрута", value: AboutRouteNavigationBarStatus.RouteCategories},
    {label: "Изображение маршрута", value: AboutRouteNavigationBarStatus.RouteAttachment},
  ];
  currentNavigationBarStatus: AboutRouteNavigationBarStatus = AboutRouteNavigationBarStatus.Route;
  protected readonly RouteCardStatus = RouteCardStatus;
  protected readonly AboutRouteNavigationBarStatus = AboutRouteNavigationBarStatus;
  routeCategories: ICategory[] = [];
  allCategories: ICategory[] = [];
  @ViewChild(RouteCardBodyComponent) routeCardBodyComponent!: RouteCardBodyComponent;

  private file?: File;

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService,
    private adminActionsService: AdminActionsService,
    private router: Router, private cdr: ChangeDetectorRef,
    private routeCategoriesService: RouteCategoriesService,
    private attachmentService: AttachmentService) {
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit() {
    this.isCreate = this.route.snapshot.data['isCreate'];
    if (this.isCreate) {
      this.routeItem = this.getEmptyRoute();
      this.routeCardStatus = RouteCardStatus.Editing;
    } else {
      this.loadRoute();
      this.loadCategories();
    }
  }

  getEmptyRoute(): IBaseRoute {
    return {
      id: 0,
      title: '',
      description: null,
      maxCountPeople: null,
      minCountPeople: null,
      baseCost: null,
      creationDateTime: new Date().toISOString(),
      isHidden: false,
      routeCategories: []
    };
  }

  loadRoute() {
    this.routeService.getRoute(this.routeId).subscribe(
      {
        next: (next: IRouteWithAttachment) => {
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
        let handleSaveResult=  this.routeCardBodyComponent?.handleSave() ?? true;
        if (handleSaveResult) {
          if (this.isCreate) {
            this.createAboutRoute()
          } else {
            this.updateAboutRoute();
          }
          this.routeCardStatus = RouteCardStatus.None;
          break
        }
    }

    this.cdr.detectChanges();
  }

  updateAboutRoute() {
    if (this.routeItem != null) {
      this.routeItem.routeCategories = this.routeCategories;
      this.adminActionsService.updateRoute(this.routeItem).subscribe(
        {
          next: (x) => this.routeItem = x,
          error: (error) => console.log("Не удалось обновить маршрут"),
          complete: () => {
          }
        }
      );
      if (this.file) {
        this.attachmentService.uploadRouteAttachment(this.file, this.routeId).subscribe(
          {error: error => console.log("Не удалось обновить картинку")}
        )
      }
    }
  }

  createAboutRoute() {
    if (this.routeItem != null) {
      this.routeItem.routeCategories = this.routeCategories;
      this.adminActionsService.createRoute(this.routeItem).subscribe(
        {
          next: (x) => this.routeItem = x,
          error: (error) => console.log("Не удалось обновить маршрут"),
          complete: () => {
            this.router.navigate(['/admin/routes/' + this.routeItem!.id]);
          }
        }
      );
      if (this.file) {
        this.attachmentService.uploadRouteAttachment(this.file, this.routeId).subscribe(
          {error: error => console.log("Не удалось обновить картинку")}
        )
      }
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
          next: (next: ICategory[]) => {
            this.allCategories = next;
          },
          error: err => {
            console.error(err);
          }
        }
      )
  }

  createNewCategory($event: INewCategoryRequest) {

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

  onFileSelected(file: File) {
    this.file = file;
  }
}

