import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRouteFormComponent } from './new-route-form.component';

describe('NewRouteFormComponent', () => {
  let component: NewRouteFormComponent;
  let fixture: ComponentFixture<NewRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRouteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
