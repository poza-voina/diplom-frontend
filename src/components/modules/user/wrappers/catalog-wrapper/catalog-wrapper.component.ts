import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {RoutesSideBarComponent} from '../../components/routes-side-bar/routes-side-bar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-catalog-wrapper',
  imports: [
    RouterOutlet
  ],
  templateUrl: './catalog-wrapper.component.html',
  styleUrl: './catalog-wrapper.component.css'
})
export class CatalogWrapperComponent {
  header: string = "";

  constructor(private cdRef: ChangeDetectorRef) {
  }

  onActivate(event: any) {
    console.log('Activated component:', event);

    if (event && event.loadCatalogEvent) {
      this.header = event.header;
    }

    this.cdRef.detectChanges();
  }
}
