import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnalyzeService } from './analyze.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AnalyzeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, SharedModule]
  }));

  it('should be created', () => {
    const service: AnalyzeService = TestBed.inject(AnalyzeService);
    expect(service).toBeTruthy();
  });
});
