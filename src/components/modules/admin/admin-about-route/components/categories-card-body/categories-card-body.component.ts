import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {RouteCardStatus} from '../../data/route-card.status';
import * as bootstrap from 'bootstrap';
import {FormsModule} from '@angular/forms';
import {CategoryItem} from '../../../../../../dto/CategoryItem';

@Component({
  selector: 'app-categories-card-body',
  imports: [
    NgForOf,
    NgSwitch,
    NgSwitchCase,
    NgIf,
    FormsModule
  ],
  templateUrl: './categories-card-body.component.html',
  styleUrl: './categories-card-body.component.css'
})
export class CategoriesCardBodyComponent {
  protected readonly RouteCardStatus = RouteCardStatus;
  @Input() routeCardStatus!: RouteCardStatus;
  @Output() routeCardStatusChange = new EventEmitter<RouteCardStatus>();

  @Input()
  allCategories: CategoryItem[] = [];
  @Output()
  allCategoriesChange = new EventEmitter<CategoryItem[]>();

  @Input()
  routeCategories: CategoryItem[] = [];
  @Output()
  routeCategoriesChange = new EventEmitter<CategoryItem[]>();

  isShowingAllCategories: boolean = false;

  test: boolean = false;

  handleRemoveCategory(item: CategoryItem) {
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

  isChecked(item: CategoryItem): boolean {
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

  toggleCategory(item: CategoryItem) {
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
}
