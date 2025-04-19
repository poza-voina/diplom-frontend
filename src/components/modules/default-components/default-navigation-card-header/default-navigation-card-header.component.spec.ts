import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNavigationCardHeaderComponent } from './default-navigation-card-header.component';

describe('DefaultNavigationCardHeaderComponent', () => {
  let component: DefaultNavigationCardHeaderComponent;
  let fixture: ComponentFixture<DefaultNavigationCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultNavigationCardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultNavigationCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
