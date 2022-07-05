import { TestBed } from '@angular/core/testing';

import { CentralAppService } from './central-app.service';

describe('CentralAppService', () => {
  let service: CentralAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
