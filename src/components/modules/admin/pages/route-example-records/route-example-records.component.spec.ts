import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteExampleRecordsComponent } from './route-example-records.component';

describe('RouteExampleRecordsComponent', () => {
  let component: RouteExampleRecordsComponent;
  let fixture: ComponentFixture<RouteExampleRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteExampleRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteExampleRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
