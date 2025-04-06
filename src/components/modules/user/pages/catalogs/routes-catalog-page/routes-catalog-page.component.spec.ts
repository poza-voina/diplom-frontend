import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesCatalogPageComponent } from './routes-catalog-page.component';

describe('RoutesCatalogPageComponent', () => {
  let component: RoutesCatalogPageComponent;
  let fixture: ComponentFixture<RoutesCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesCatalogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
