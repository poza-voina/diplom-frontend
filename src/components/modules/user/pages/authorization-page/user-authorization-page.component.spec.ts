import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthorizationPageComponent } from './user-authorization-page.component';

describe('AuthorizationPageComponent', () => {
  let component: UserAuthorizationPageComponent;
  let fixture: ComponentFixture<UserAuthorizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuthorizationPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuthorizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
