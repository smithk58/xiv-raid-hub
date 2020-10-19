import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AlarmService } from './alarm.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule]
    });
    service = TestBed.inject(AlarmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
