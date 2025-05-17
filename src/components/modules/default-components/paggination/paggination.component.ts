import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-paggination',
  imports: [
    NgIf,
    NgForOf,
    NgStyle
  ],
  templateUrl: './paggination.component.html',
  styleUrl: './paggination.component.css'
})
export class PagginationComponent {
  @Input() totalPages = 0;
  @Input() itemsPerPage = 10;
  @Input() currentPage = 1;
  @Output() pageChanged = new EventEmitter<number>();

  maxPagesToShow = 5;  // сколько страниц показываем между первой и последней

  get pages(): number[] {
    const pages: number[] = [];
    if (this.totalPages <= this.maxPagesToShow + 2) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Иначе показываем с логикой
      let start = Math.max(this.currentPage - Math.floor(this.maxPagesToShow / 2), 2);
      let end = start + this.maxPagesToShow - 1;

      if (end > this.totalPages - 1) {
        end = this.totalPages - 1;
        start = end - this.maxPagesToShow + 1;
      }

      // Добавляем первую страницу
      pages.push(1);

      // Добавляем промежуточные страницы с "..." где надо
      if (start > 2) {
        pages.push(-1); // -1 - индикатор многоточия слева
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < this.totalPages - 1) {
        pages.push(-2); // -2 - индикатор многоточия справа
      }

      // Добавляем последнюю страницу
      pages.push(this.totalPages);
    }

    return pages;
  }

  selectPage(page: number) {
    if (page === -1 || page === -2) return; // пропускаем клики по многоточию
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }
}
