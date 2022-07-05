import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordWithUsernameComponent } from './reset-password-with-username.component';

describe('ResetPasswordWithUsernameComponent', () => {
  let component: ResetPasswordWithUsernameComponent;
  let fixture: ComponentFixture<ResetPasswordWithUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordWithUsernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordWithUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
