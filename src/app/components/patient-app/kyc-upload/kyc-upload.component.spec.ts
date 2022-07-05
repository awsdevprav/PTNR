import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KYCUploadComponent } from './kyc-upload.component';

describe('KYCUploadComponent', () => {
  let component: KYCUploadComponent;
  let fixture: ComponentFixture<KYCUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KYCUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KYCUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
