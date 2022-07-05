import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAffiliatesDetailComponent } from './view-affiliates-detail.component';

describe('ViewAffiliatesDetailComponent', () => {
  let component: ViewAffiliatesDetailComponent;
  let fixture: ComponentFixture<ViewAffiliatesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAffiliatesDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAffiliatesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
