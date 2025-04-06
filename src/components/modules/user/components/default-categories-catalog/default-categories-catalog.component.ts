import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-default-categories-catalogue',
    imports: [
        NgForOf
    ],
  templateUrl: './default-categories-catalog.component.html',
  styleUrl: './default-categories-catalog.component.css'
})
export class DefaultCategoriesCatalogueComponent {
  routeCategories = [
    {
      name: 'Mountain Trails',
      count: 49,
      image: 'assets/images/mountain.jpg'
    },
    {
      name: 'Coastal Paths',
      count: 7,
      image: 'assets/images/coast.jpg'
    },
    {
      name: 'Forest Treks',
      count: 13,
      image: 'assets/images/forest.jpg'
    },
    {
      name: 'Camping Routes',
      count: 63,
      image: 'assets/images/camping.jpg'
    },
    {
      name: 'Alpine Trails',
      count: 23,
      image: 'assets/images/alpine.jpg'
    },
    {
      name: 'Desert Expeditions',
      count: 11,
      image: 'assets/images/desert.jpg'
    }
  ];
}
