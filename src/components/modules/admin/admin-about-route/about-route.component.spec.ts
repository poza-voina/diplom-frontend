import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRouteComponent } from './about-route.component';

describe('AboutRouteComponent', () => {
  let component: AboutRouteComponent;
  let fixture: ComponentFixture<AboutRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutRouteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
