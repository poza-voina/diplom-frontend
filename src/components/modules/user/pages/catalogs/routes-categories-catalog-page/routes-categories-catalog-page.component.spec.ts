import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesCategoriesCatalogPageComponent } from './routes-categories-catalog-page.component';

describe('RoutesCategoriesCatalogPageComponent', () => {
  let component: RoutesCategoriesCatalogPageComponent;
  let fixture: ComponentFixture<RoutesCategoriesCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesCategoriesCatalogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesCategoriesCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
