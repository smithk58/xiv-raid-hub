import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ClassSearchService } from './class-search.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ClassSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, SharedModule]
  }));

  it('should be created', () => {
    const service: ClassSearchService = TestBed.inject(ClassSearchService);
    expect(service).toBeTruthy();
  });
});
