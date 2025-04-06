import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCategoriesCatalogueComponent } from './default-categories-catalogue.component';

describe('DefaultCategoriesCatalogueComponent', () => {
  let component: DefaultCategoriesCatalogueComponent;
  let fixture: ComponentFixture<DefaultCategoriesCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCategoriesCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCategoriesCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
