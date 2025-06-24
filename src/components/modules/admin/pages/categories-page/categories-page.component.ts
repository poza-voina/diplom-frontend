import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryEditingStatus, ICategory, ICategoryW} from '../../../../../dto/ICategory';
import {RouteCategoriesService} from '../../../../../services/route-categories.service';
import {tap} from 'rxjs/operators';
import {map} from 'rxjs';

@Component({
  selector: 'app-categories-page',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent implements OnInit {
  categories: ICategoryW[] = [];
  CategoryEditingStatus = CategoryEditingStatus;
  isNotFound: boolean = false;

  constructor(private service: RouteCategoriesService) {  }

  ngOnInit() {
    this.service.getAll().pipe(
      map(value => {
        return value.map(category => ({
          ...category,
          editingStatus: CategoryEditingStatus.DEFAULT
        }));
      })
    ).subscribe({
      next: value => {
        this.categories = value;
        this.isNotFound = this.categories.length === 0;
      },
      error: error => {
        this.isNotFound = true;
      }
    });
  }

  handleEdit(index: number) {
    this.categories[index].editingStatus = CategoryEditingStatus.EDITING;
  }

  handleSave(index: number) {
    this.service.update(this.categories[index]).subscribe()
    this.categories[index].editingStatus = CategoryEditingStatus.DEFAULT;
  }

  handleDelete(index: number) {
    this.service.delete(this.categories[index].id).subscribe(
      {
        next: value => {
          this.categories.splice(index, 1);
        },
        error: error => {console.warn(error);}
      }
    )
  }

  handleSaveAll() {
    this.service.updateAll(this.categories);
    this.categories.forEach(cat => {
      if (cat.editingStatus === CategoryEditingStatus.EDITING) {
        cat.editingStatus = CategoryEditingStatus.DEFAULT;
      }
    });
  }
}

