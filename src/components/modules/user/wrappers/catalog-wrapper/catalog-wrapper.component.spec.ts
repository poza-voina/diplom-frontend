import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogWrapperComponent } from './catalog-wrapper.component';

describe('CatalogWrapperComponent', () => {
  let component: CatalogWrapperComponent;
  let fixture: ComponentFixture<CatalogWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
