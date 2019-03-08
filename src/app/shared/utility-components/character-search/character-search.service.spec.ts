import { TestBed } from '@angular/core/testing';

import { CharacterSearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CharacterSearchService = TestBed.get(CharacterSearchService);
    expect(service).toBeTruthy();
  });
});
