import { TestBed } from '@angular/core/testing';

import { AnalyzeCharacterService } from './analyze-character.service';

describe('AnalyzeCharacterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalyzeCharacterService = TestBed.get(AnalyzeCharacterService);
    expect(service).toBeTruthy();
  });
});
