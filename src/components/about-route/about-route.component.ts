import {Component, OnInit} from '@angular/core';
import {MapComponent} from '../base/map/map.component';
import {RouteService} from '../../services/RouteService';
import {RouteItem} from '../../data/RouteItem';
import {tap} from 'rxjs';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormsModule} from '@angular/forms';
import {RouteExampleItem} from '../../data/RouteExampleItem';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-about-route',
  imports: [
    MapComponent,
    NgIf,
    CKEditorModule,
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
  ],
  templateUrl: './about-route.component.html',
  styleUrl: './about-route.component.css'
})
export class AboutRouteComponent implements OnInit{
  mapPoints: [number, number][] = [
    [55.751574, 37.573856], // Москва
    [59.934280, 30.335099]  // Санкт-Петербург
  ];
  private routeService: RouteService;
  routeItem: RouteItem | null = null;
  routeExamples: RouteExampleItem[] = [];

  routeCardStatus: RouteCardStatus = RouteCardStatus.None;
  routeId: number;

  constructor(private route: ActivatedRoute, routeService: RouteService) {
    this.routeService = routeService;
    this.routeId = +this.route.snapshot.paramMap.get('routeId')!;
  }

  ngOnInit() {
    this.loadRoute();
    this.loadRouteExamples()
  }

  loadRoute() {
    this.routeService.getRoute(this.routeId).pipe(tap(x => this.routeItem = x)).subscribe(
      {}
    )
  }

  loadRouteExamples() {
    this.routeService.getRouteExamples(this.routeId).pipe(tap(x => this.routeExamples = x)).subscribe({});
  }

  ToggleEditRouteCard() {
    switch (this.routeCardStatus) {
      case RouteCardStatus.None:
        this.routeCardStatus = RouteCardStatus.Editing;
        break;
      case RouteCardStatus.Editing:
        this.routeCardStatus = RouteCardStatus.None;
    }
  }

  protected readonly RouteCardStatus = RouteCardStatus;
}


enum RouteCardStatus {
  Editing,
  None
}
