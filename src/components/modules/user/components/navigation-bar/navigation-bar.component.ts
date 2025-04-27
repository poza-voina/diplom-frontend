import {Component, HostListener} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass, NgIf} from '@angular/common';
import {MobileMenuComponent} from './mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink,
    NgIf,
    NgClass,
    MobileMenuComponent
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  dropdownOpen = false;

  isMobile: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 992;
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
    }
  }
}
