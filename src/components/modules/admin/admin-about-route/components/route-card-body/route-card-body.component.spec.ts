import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteCardBodyComponent } from './route-card-body.component';

describe('RouteCardBodyComponent', () => {
  let component: RouteCardBodyComponent;
  let fixture: ComponentFixture<RouteCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteCardBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
