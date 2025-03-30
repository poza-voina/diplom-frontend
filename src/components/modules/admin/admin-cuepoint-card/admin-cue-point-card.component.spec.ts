import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCuePointCardComponent } from './admin-cue-point-card.component';

describe('AdminCuepointCardComponent', () => {
  let component: AdminCuePointCardComponent;
  let fixture: ComponentFixture<AdminCuePointCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCuePointCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCuePointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
