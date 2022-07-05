import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserListingComponent } from './add-user-listing.component';

describe('AddUserListingComponent', () => {
  let component: AddUserListingComponent;
  let fixture: ComponentFixture<AddUserListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
