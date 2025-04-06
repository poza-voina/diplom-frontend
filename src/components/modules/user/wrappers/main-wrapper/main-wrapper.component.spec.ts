import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWrapperComponent } from './main-wrapper.component';

describe('MainWrapperComponent', () => {
  let component: MainWrapperComponent;
  let fixture: ComponentFixture<MainWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
