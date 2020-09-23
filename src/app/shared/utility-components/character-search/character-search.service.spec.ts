import { TestBed } from '@angular/core/testing';

import { XivapiClientModule, XivapiService } from '@xivapi/angular-client';

import { CharacterSearchService } from 'src/app/shared/utility-components/character-search/character-search.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CharacterSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [XivapiClientModule.forRoot(), SharedModule],
    providers: [XivapiService]
  }));

  it('should be created', () => {
    const service: CharacterSearchService = TestBed.inject(CharacterSearchService);
    expect(service).toBeTruthy();
  });
});
