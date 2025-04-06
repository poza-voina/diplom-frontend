import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesSideBarComponent } from './routes-side-bar.component';

describe('RoutesSideBarComponent', () => {
  let component: RoutesSideBarComponent;
  let fixture: ComponentFixture<RoutesSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutesSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
