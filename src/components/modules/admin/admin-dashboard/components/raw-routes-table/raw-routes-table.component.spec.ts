import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawRoutesTableComponent } from './raw-routes-table.component';

describe('RawRoutesTableComponent', () => {
  let component: RawRoutesTableComponent;
  let fixture: ComponentFixture<RawRoutesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawRoutesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawRoutesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
