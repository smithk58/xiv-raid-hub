import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FFService } from 'src/app/shared/api/xiv-raid-hub/ff.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('FFService', () => {
  let service: FFService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule]
    });
    service = TestBed.inject(FFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
