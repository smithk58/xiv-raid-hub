import { TestBed } from '@angular/core/testing';

import { FFLogsApiService } from './fflogs-api.service';

describe('FFLogsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FFLogsApiService = TestBed.inject(FFLogsApiService);
    expect(service).toBeTruthy();
  });
});
