import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {tap} from 'rxjs';
import {RoutesFilter, RoutesSort} from './routesSort';
import * as bootstrap from 'bootstrap';
import {Router} from '@angular/router';
import {NewRouteFormComponent} from '../../../forms/new-route-form/new-route-form.component';
import {ModalWindowComponent} from '../../../base/modal-window/modal-window.component';
import {RouteItem} from '../../../../data/RouteItem';
import {RouteService} from '../../../../services/route.service';
import {GetRoutesWithFiltersDto} from '../../../../dto/GetRoutesWithFiltersDto';
import {AdminActionsService} from '../../../../services/admin-actions.service';

@Component({
  selector: 'app-admin-routes',
  standalone: true,
  imports: [CommonModule, ModalWindowComponent, NewRouteFormComponent],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})

export class RoutesComponent {
  @ViewChild(NewRouteFormComponent) newRouteFormComponent!: NewRouteFormComponent;
  routes: RouteItem[] = [];
  routesLoadingStatus: RoutesLoadingStatus = RoutesLoadingStatus.Completed;
  routesStatuses: RoutesStatuses = new RoutesStatuses(this.routes);
  selectedSort: RoutesSort = RoutesSort.None;
  addNewRouteModalId: string = "newRouteForm";
  filters: RoutesFilter[] = [];
  protected readonly RoutesLoadingStatus = RoutesLoadingStatus;
  protected readonly RouteStatus = RouteStatus;
  protected readonly RoutesSortHelper: RoutesSortHelper = new RoutesSortHelper();
  othersSort: RoutesSort[] = this.RoutesSortHelper.getKeys().slice(1);
  private pageNumber: number = 1;
  private countPerPage: number = 10;

  constructor(
    private routeService: RouteService,
    private adminActionsService: AdminActionsService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadRoutes();
    this.routesStatuses.update(this.routes);
  }

  loadRoutes(): void {
    let getRoutesDto: GetRoutesWithFiltersDto = new GetRoutesWithFiltersDto({
      pageNumber: this.pageNumber,
      countPerPage: this.countPerPage,
      sortType: this.selectedSort,
      filters: this.filters
    });
    this.routesLoadingStatus = RoutesLoadingStatus.Loading;

    this.adminActionsService.getRoutes(getRoutesDto)
      .pipe(
        tap(routes => this.routes = routes)
      )
      .subscribe({
        error: (error) => {
          this.routesLoadingStatus = RoutesLoadingStatus.Error;
        },
        complete: () => {
          this.routesLoadingStatus = RoutesLoadingStatus.Completed;
        }
      });
  }

  goToRoute(id: number): void {
    this.router.navigate(['/admin/routes', id]);
  }

  showRoute(event: Event, item: RouteItem) {
    event.stopPropagation();
    let buffer: RouteItem = {...item};
    this.routesStatuses.setStatus(item, RouteStatus.ToggleVisibility)
    this.adminActionsService.updateRoute(buffer).pipe()
      .subscribe({
        error: (error) => {
          this.routesStatuses.setStatus(item, RouteStatus.None)
        },
        complete: () => {
          item.isHidden = false;
          this.routesStatuses.setStatus(item, RouteStatus.None);
        }
      });
  }

  hideRoute(event: Event, item: RouteItem) {
    event.stopPropagation();
    let buffer: RouteItem = {...item};
    this.routesStatuses.setStatus(item, RouteStatus.ToggleVisibility)
    this.adminActionsService.updateRoute(buffer).pipe()
      .subscribe({
        error: (error) => {
          this.routesStatuses.setStatus(item, RouteStatus.None)
        },
        complete: () => {
          item.isHidden = true;
          this.routesStatuses.setStatus(item, RouteStatus.None);
        }
      });
  }

  handleSortRoutes(sortingType: RoutesSort) {
    this.othersSort = this.othersSort.filter(x => x !== sortingType);
    this.othersSort.push(this.selectedSort);
    this.selectedSort = sortingType;

    this.loadRoutes();
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


  dropDownHandler(dropdownId: string) {
    const element = document.getElementById(dropdownId);
    if (element) {
      const dropdown = new bootstrap.Dropdown(element);
      dropdown.toggle();
    }
  }

  createNewRoute(routeItem: RouteItem) {
    this.adminActionsService.createRoute(routeItem).pipe().subscribe({
      error: (error) => {
        this.newRouteFormComponent.afterSaveHandler("Не удалось сохранить маршрут");
      },
      complete: () => {
        this.newRouteFormComponent.afterSaveHandler(null);
      }
    });
  }

  showHiddenRoute(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filters.push(RoutesFilter.ShowHidden);
    } else {
      this.filters = this.filters.filter(f => f !== RoutesFilter.ShowHidden);
    }
    this.loadRoutes();
  }

  showVisibleRoute(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.filters.push(RoutesFilter.ShowVisible);
    } else {
      this.filters = this.filters.filter(f => f !== RoutesFilter.ShowVisible);
    }
    this.loadRoutes();
  }
}

enum RoutesLoadingStatus {
  Loading,
  Error,
  Completed
}

enum RouteStatus {
  None,
  ToggleVisibility,
  ToggleVisibilityCompleted
}


class RoutesStatuses {
  dictionary: { [key: number]: RouteStatus } = {};

  constructor(items: RouteItem[]) {
    items.forEach(item => this.dictionary[item.id] = RouteStatus.None);
  }

  update(items: RouteItem[]) {
    items.forEach(item => this.dictionary[item.id] = RouteStatus.None);
  }

  getStatus(item: RouteItem): RouteStatus {
    return this.dictionary[item.id];
  }

  setStatus(item: RouteItem, status: RouteStatus) {
    this.dictionary[item.id] = status;
  }
}


class RoutesSortHelper {

  public constructor() {
  }

  getValues(): string[] {
    return Object.values(RoutesSort);
  }

  getKeys(): RoutesSort[] {
    return Object.keys(RoutesSort) as RoutesSort[];
  }

  getDescriptions(): string[] {
    return this.getKeys().map(x => this.getDescription(x));
  }

  getDescriptionsByKeys(sort: RoutesSort[]) {
    return sort.map(x => this.getDescription(x));
  }

  getDescription(sort: RoutesSort): string {
    switch (sort) {
      case RoutesSort.None:
        return "Без сортировки"
      case RoutesSort.ByTitle:
        return 'Сортировка по названию';
      case RoutesSort.ByCreating:
        return 'Сортировка по дате';
      default:
        return 'Нет такого типа сортировки';
    }
  }

  fromString(value: string): RoutesSort | undefined {
    return RoutesSort[value as keyof typeof RoutesSort];
  }
}
