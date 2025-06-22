import {Component, HostListener, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ClientAuthService} from '../../../service/client-auth.service';

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
    {label: "Маршруты", link: "/routes"},
    {label: "Категории", link: "/routes/categories"},
  ];

  isMenuOpen = false;
  isProfileMenuOpen = false;
  currentItem: MenuItem | undefined;

  constructor(protected authService: ClientAuthService) {
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Проверяем, был ли клик вне кнопки и меню
    if (!target.closest('.dropdown-menu') && !target.closest('.btn-light')) {
      this.isMenuOpen = false;
      this.isProfileMenuOpen = false;
    }
  }

  ngOnInit() {
    // Инициализация currentItem после того как items уже определены
    this.currentItem = this.items[0];
  }

  toggleMenuDropdown(event: MouseEvent) {
    event.stopPropagation(); // Чтобы клик по кнопке не закрывал меню
    this.isProfileMenuOpen = false;
    this.isMenuOpen = true;
  }

  toggleProfileMenuDropdown(event: MouseEvent) {
    event.stopPropagation(); // Чтобы клик по кнопке не закрывал меню
    this.isProfileMenuOpen = true;
    this.isMenuOpen = false;
  }

  closeDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.position-relative');
    this.isProfileMenuOpen = false;
    this.isMenuOpen = false;
  }

  logoutHandler() {
    this.authService.removeToken();
  }
}

interface MenuItem {
  label: string;
  link: string;
}
