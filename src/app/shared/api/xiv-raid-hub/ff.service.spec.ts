import { TestBed } from '@angular/core/testing';

import { FFService } from 'src/app/shared/api/xiv-raid-hub/ff.service';

describe('FFService', () => {
  let service: FFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
