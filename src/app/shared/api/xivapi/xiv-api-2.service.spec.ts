import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import {XivApiService2} from 'src/app/shared/api/xivapi/xiv-api-2.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('XivApiService2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, SharedModule]
  }));

  it('should be created', () => {
    const service: XivApiService2 = TestBed.inject(XivApiService2);
    expect(service).toBeTruthy();
  });
});
