import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  imports: [
    NgIf,
    RouterLink,
    NgForOf
  ],
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {

  items: MenuItem[] = [
    { label: "Маршруты", link: "/routes" },
    { label: "Категории", link: "/categories" },
    { label: "Избранные маршруты", link: "/favorites" },
    { label: "Записи на маршрут", link: "/bron" },
  ];

  mobileMenuOpen = false;
  currentItem: MenuItem | undefined;
  dropdownOpen: boolean = false;

  ngOnInit() {
    // Инициализация currentItem после того как items уже определены
    this.currentItem = this.items[0];
  }

  toggleMobileMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(event: MouseEvent): void {
    // Закрыть меню только если клик был не на кнопке или меню
    const button = event.target as HTMLElement;
    if (!button.closest('.btn') && !button.closest('.position-relative')) {
      this.mobileMenuOpen = false;
    }
  }

  // Метод для выбора пункта меню
  selectItem(item: MenuItem) {
    this.currentItem = item;
    // Закрываем меню после выбора
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Чтобы клик по кнопке не закрывал меню
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.position-relative');
    if (!clickedInside) {
      this.dropdownOpen = false;
    }}
}

interface MenuItem {
  label: string;
  link: string;
}
