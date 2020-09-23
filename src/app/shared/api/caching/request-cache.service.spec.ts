import { TestBed } from '@angular/core/testing';

import { RequestCacheService } from 'src/app/shared/api/caching/request-cache.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RequestCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SharedModule]
  }));

  it('should be created', () => {
    const service: RequestCacheService = TestBed.inject(RequestCacheService);
    expect(service).toBeTruthy();
  });
});
