import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GuildsService } from 'src/app/shared/api/xiv-raid-hub/guilds.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('GuildsService', () => {
  let service: GuildsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule]
    });
    service = TestBed.inject(GuildsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
