import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteExamplesTableComponent } from './route-examples-table.component';

describe('RouteExamplesTableComponent', () => {
  let component: RouteExamplesTableComponent;
  let fixture: ComponentFixture<RouteExamplesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteExamplesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteExamplesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
