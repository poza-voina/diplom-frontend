import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoutesCategoriesComponent } from './admin-routes-categories.component';

describe('AdminRoutesCategoriesComponent', () => {
  let component: AdminRoutesCategoriesComponent;
  let fixture: ComponentFixture<AdminRoutesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoutesCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoutesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
