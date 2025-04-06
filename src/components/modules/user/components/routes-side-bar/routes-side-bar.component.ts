import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-routes-side-bar',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './routes-side-bar.component.html',
  styleUrl: './routes-side-bar.component.css'
})
export class RoutesSideBarComponent {
  navItems = [
    {icon:  "bi bi-map", label: "Маршруты", link: "/routes", isActive: false},
    {icon:  "bi bi-tags", label: "Категории", link: "/routes/categories", isActive: false},
    {icon:  "bi bi-calendar-check", label: "Мои броннирования", link: "/routes/reservation", isActive: false},
    {icon:  "bi bi-star", label: "Избранные маршруты", link: "/routes/favorites", isActive: false},
  ]
}














