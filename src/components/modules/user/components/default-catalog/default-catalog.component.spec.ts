import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultCatalogueComponent } from './default-catalogue.component';

describe('DefaultCatalogueComponent', () => {
  let component: DefaultCatalogueComponent;
  let fixture: ComponentFixture<DefaultCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
