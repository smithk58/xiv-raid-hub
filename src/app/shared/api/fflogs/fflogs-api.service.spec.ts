import { TestBed } from '@angular/core/testing';

import { FflogsApiService } from './fflogs-api.service';

describe('FflogsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FflogsApiService = TestBed.get(FflogsApiService);
    expect(service).toBeTruthy();
  });
});
