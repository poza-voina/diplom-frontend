import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRoutesTableComponent } from './open-routes-table.component';

describe('OpenRoutesTableComponent', () => {
  let component: OpenRoutesTableComponent;
  let fixture: ComponentFixture<OpenRoutesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenRoutesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenRoutesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
