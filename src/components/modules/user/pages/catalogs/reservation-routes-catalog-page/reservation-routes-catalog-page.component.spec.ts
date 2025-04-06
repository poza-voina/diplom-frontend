import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRoutesCatalogPageComponent } from './reservation-routes-catalog-page.component';

describe('ReservationRoutesCatalogPageComponent', () => {
  let component: ReservationRoutesCatalogPageComponent;
  let fixture: ComponentFixture<ReservationRoutesCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationRoutesCatalogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationRoutesCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
