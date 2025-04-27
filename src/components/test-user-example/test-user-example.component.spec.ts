import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUserExampleComponent } from './test-user-example.component';

describe('TestUserExampleComponent', () => {
  let component: TestUserExampleComponent;
  let fixture: ComponentFixture<TestUserExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestUserExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestUserExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
