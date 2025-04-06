import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationPageComponent } from './user-registration-page.component';

describe('RegistrationPageComponent', () => {
  let component: UserRegistrationPageComponent;
  let fixture: ComponentFixture<UserRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegistrationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
