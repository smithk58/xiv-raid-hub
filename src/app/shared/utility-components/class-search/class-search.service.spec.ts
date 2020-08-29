import { TestBed } from '@angular/core/testing';

import { ClassSearchService } from './class-search.service';

describe('ClassSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassSearchService = TestBed.inject(ClassSearchService);
    expect(service).toBeTruthy();
  });
});
