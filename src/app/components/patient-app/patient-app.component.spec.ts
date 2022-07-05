import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppComponent } from './patient-app.component';

describe('PatientAppComponent', () => {
  let component: PatientAppComponent;
  let fixture: ComponentFixture<PatientAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
