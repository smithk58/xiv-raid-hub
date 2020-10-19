import { TestBed } from '@angular/core/testing';

import { GuildsService } from 'src/app/shared/api/xiv-raid-hub/guilds.service';

describe('GuildsService', () => {
  let service: GuildsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuildsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
