import { TestBed } from '@angular/core/testing';

import { SsssService } from './ssss.service';

describe('SsssService', () => {
  let service: SsssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
