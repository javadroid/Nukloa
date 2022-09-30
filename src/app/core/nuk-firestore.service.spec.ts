import { TestBed } from '@angular/core/testing';

import { NukFirestoreService } from './nuk-firestore.service';

describe('NukFirestoreService', () => {
  let service: NukFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NukFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
