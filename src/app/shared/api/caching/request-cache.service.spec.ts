import { TestBed } from '@angular/core/testing';

import { RequestCacheService } from 'src/app/shared/api/caching/request-cache.service';

describe('RequestCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestCacheService = TestBed.get(RequestCacheService);
    expect(service).toBeTruthy();
  });
});
