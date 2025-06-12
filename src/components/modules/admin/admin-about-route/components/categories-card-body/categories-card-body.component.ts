import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {RouteCardStatus} from '../../data/route-card.status';
import * as bootstrap from 'bootstrap';
import {FormsModule} from '@angular/forms';
import {ICategory} from '../../../../../../dto/ICategory';
import {AddNewCategoryComponent} from '../../../add-new-category/add-new-category.component';
import {ModalWindowComponent} from '../../../../../base/modal-window/modal-window.component';
import {INewCategoryRequest} from '../../../../../../dto/new-category-item.interface';
import {AdminActionsService} from '../../../../../../services/admin-actions.service';

@Component({
  selector: 'app-categories-card-body',
  imports: [
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgIf,
    FormsModule,
    AddNewCategoryComponent,
    ModalWindowComponent
  ],
  templateUrl: './categories-card-body.component.html',
  styleUrl: './categories-card-body.component.css'
})
export class CategoriesCardBodyComponent {
  @Input() routeCardStatus!: RouteCardStatus;
  @Output() routeCardStatusChange = new EventEmitter<RouteCardStatus>();
  @Input()
  allCategories: ICategory[] = [];
  @Output()
  allCategoriesChange = new EventEmitter<ICategory[]>();
  @Input()
  routeCategories: ICategory[] = [];
  @Output()
  routeCategoriesChange = new EventEmitter<ICategory[]>();
  isShowingAllCategories: boolean = false;
  test: boolean = false;
  addNewCategoryModelId: string = "addNewCategoryModel";
  protected readonly RouteCardStatus = RouteCardStatus;
  modalLabel: string = "Создание новой категории";

  constructor(private adminActionsService: AdminActionsService) {
  }

  handleRemoveCategory(item: ICategory) {
    this.routeCategories = this.routeCategories.filter(c => c !== item);
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

  toggleShowAllCategories() {
    console.log("toggleShowAllCategories");
    this.isShowingAllCategories = !this.isShowingAllCategories;
    console.log(this.routeCategories);
    console.log(this.allCategories);
  }

  getAllCategories() {
    return this.getIntersectionFilteredCategories().concat(this.getDifferenceCategories());
  }

  isChecked(item: ICategory): boolean {
    return this.routeCategories.some(c => c.title === item.title);
  }

  getIntersectionFilteredCategories() {
    return this.allCategories.filter(x =>
      this.routeCategories.some(c => c.title === x.title));
  }

  getDifferenceCategories() {
    return this.allCategories.filter(x =>
      !this.routeCategories.some(c => c.title === x.title));
  }

  toggleCategory(item: ICategory) {
    const index = this.routeCategories.findIndex(x => x.title === item.title);

    if (index > -1) {
      // Удаляем элемент без создания нового массива
      this.routeCategories.splice(index, 1);
    } else {
      // Добавляем элемент
      this.routeCategories.push(item);
    }

    // Уведомляем родителя об изменении
    this.routeCategoriesChange.emit(this.routeCategories);
  }

  getCategories() {
    if (this.routeCardStatus == RouteCardStatus.None) {
      return this.getIntersectionFilteredCategories();
    }
    return this.isShowingAllCategories ? this.getAllCategories() : this.getIntersectionFilteredCategories();
  }

  createNewCategory(item: INewCategoryRequest) {
    this.adminActionsService.createCategory(item).subscribe(
      {
        next: (response) => this.allCategories.push(response),
        error: (error) => console.log(error)
      }
    )
    this.closeModal(this.addNewCategoryModelId);
  }
}
