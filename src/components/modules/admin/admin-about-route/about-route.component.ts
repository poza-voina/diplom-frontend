import {MapComponent} from '../../../base/map/map.component';
import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouteService} from '../../../../services/RouteService';
import {RouteItem} from '../../../../data/RouteItem';
import {RouteExampleItem} from '../../../../data/RouteExampleItem';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs';

@Component({
  selector: 'app-admin-about-route',
  imports: [
    MapComponent,
    NgIf,
    FormsModule,
    NgSwitch,
    NgSwitchCase,
    NgForOf,
  ],
  templateUrl: './about-route.component.html',
  styleUrl: './about-route.component.css'
})
export class AboutRouteComponent implements OnInit {
  private routeService: RouteService;
  routeItem: RouteItem | null = null;
  routeExamples: RouteExampleItem[] = [];

  routeCardStatus: RouteCardStatus = RouteCardStatus.None;
  routeId: number;

  constructor(private route: ActivatedRoute, routeService: RouteService, private router: Router) {
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
        this.updateAboutRoute();
        this.routeCardStatus = RouteCardStatus.None;
        break
    }
  }

  updateAboutRoute() {
    if (this.routeItem != null) {
      this.routeService.updateRoute(this.routeItem).pipe().subscribe(
        {
          next: (x) => this.routeItem = x,
          error: (error) => console.log("Не удалось обновить маршрут"),
          complete: () => {}
        }
      );
    }
  }

  goToRouteMap() {
    this.router.navigate(['/admin/routes', this.routeId, 'map'])
  }

  protected readonly RouteCardStatus = RouteCardStatus;
}


enum RouteCardStatus {
  Editing,
  None
}
