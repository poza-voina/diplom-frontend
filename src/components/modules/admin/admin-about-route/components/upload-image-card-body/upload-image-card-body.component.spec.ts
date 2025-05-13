import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageCardBodyComponent } from './upload-image-card-body.component';

describe('UploadImageCardBodyComponent', () => {
  let component: UploadImageCardBodyComponent;
  let fixture: ComponentFixture<UploadImageCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImageCardBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImageCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
