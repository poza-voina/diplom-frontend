import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCardBodyComponent } from './categories-card-body.component';

describe('CategoriesCardBodyComponent', () => {
  let component: CategoriesCardBodyComponent;
  let fixture: ComponentFixture<CategoriesCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesCardBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
