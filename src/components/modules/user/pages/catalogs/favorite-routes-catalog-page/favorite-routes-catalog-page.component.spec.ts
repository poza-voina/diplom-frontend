import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRoutesCatalogPageComponent } from './favorite-routes-catalog-page.component';

describe('FavoriteRoutesCatalogPageComponent', () => {
  let component: FavoriteRoutesCatalogPageComponent;
  let fixture: ComponentFixture<FavoriteRoutesCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteRoutesCatalogPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteRoutesCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
