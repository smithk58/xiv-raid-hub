import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FFLogsApiService } from './fflogs-api.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('FFLogsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, SharedModule]
  }));

  it('should be created', () => {
    const service: FFLogsApiService = TestBed.inject(FFLogsApiService);
    expect(service).toBeTruthy();
  });
});
