import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuePointCardHeaderComponent } from './admin-cue-point-card-header.component';

describe('AdminCuePointCardHeaderComponent', () => {
  let component: AdminCuePointCardHeaderComponent;
  let fixture: ComponentFixture<AdminCuePointCardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCuePointCardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCuePointCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
