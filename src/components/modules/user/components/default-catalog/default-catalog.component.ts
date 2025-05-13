import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouteService} from '../../../../../services/route.service';
import {IBaseRoute} from '../../../../../data/route/IBaseRoute';

@Component({
  selector: 'app-default-catalogue',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './default-catalog.component.html',
  styleUrl: './default-catalog.component.css'
})
export class DefaultCatalogueComponent {
  @Input()
  routes: IBaseRoute[] = []

  constructor(private routeService: RouteService) {
  }
}
