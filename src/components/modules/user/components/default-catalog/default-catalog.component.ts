import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouteItem} from '../../../../../data/RouteItem';
import {RouteService} from '../../../../../services/route.service';

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
  routes: RouteItem[] = []

  constructor(private routeService: RouteService) {
  }
}
