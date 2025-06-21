import {Component, OnInit, Type} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, Routes} from '@angular/router';
import {filter} from 'rxjs';
import {NgForOf, NgIf} from '@angular/common';
import {right} from '@popperjs/core';

interface Breadcrumb {
  label: string;
  url: string;
  segment: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})

export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  // костыль :)
  exceptionsUrls: string[] = ['examples'];
  // еще костыль :)
  breadcrumbsAssociation: { [key: string]: string }  = {
    "admin": "Панель администратора",
    "routes": "Маршруты",
    "examples": "Экземпляры",
    "categories": "Категории",
    "records": "Записи",
    "map": "Ключевые точки",
    "new": "Новый",
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateBreadcrumbs(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumbs(event.urlAfterRedirects);
    });
  }

  updateBreadcrumbs(url: string): void {
    const cleanUrl = url.split('?')[0].split('#')[0];
    const segments = cleanUrl.split('/').filter(Boolean);

    let path = '';
    this.breadcrumbs = [];

    for (let i = 0; i < segments.length; i++) {
      path += `/${segments[i]}`;

      let label = '';

      label = this.formatLabel(segments[i]);
      // костыль чтобы скипались несуществующие маршруты
      if (this.exceptionsUrls.includes(segments[i])) {
        path = this.breadcrumbs[this.breadcrumbs.length - 1].url;
      }
      else if(!isNaN(Number(segments[i])) && this.exceptionsUrls.includes(segments[i - 1])) {
        path = this.breadcrumbs[this.breadcrumbs.length - 2].url;
      }

      this.breadcrumbs.push({ label, url: path, segment: segments[i] });
    }
  }

  findRouteByPath(path: string, routes: Routes): any {
    // Приводим к формату без слэша в начале
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    for (const route of routes) {
      if (!route.path) continue;

      // Разбиваем путь маршрута и текущий путь на сегменты
      const routeSegments = route.path.split('/');
      const pathSegments = cleanPath.split('/');

      if (routeSegments.length !== pathSegments.length) continue;

      // Проверяем сегмент за сегментом, учитывая параметрические сегменты (:id)
      let match = true;
      for (let i = 0; i < routeSegments.length; i++) {
        if (routeSegments[i].startsWith(':')) continue; // параметр
        if (routeSegments[i] !== pathSegments[i]) {
          match = false;
          break;
        }
      }

      if (match) return route;
    }

    return null;
  }

  formatLabel(segment: string): string {
    if (segment === '') {}

    if (segment in this.breadcrumbsAssociation) {
      return this.breadcrumbsAssociation[segment];
    }

    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
}
