import { TestBed } from '@angular/core/testing';

import { DblocalService } from './dblocal.service';

describe('DblocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DblocalService = TestBed.get(DblocalService);
    expect(service).toBeTruthy();
  });
});
