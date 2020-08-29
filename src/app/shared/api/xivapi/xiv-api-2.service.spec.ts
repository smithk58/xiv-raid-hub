import { TestBed } from '@angular/core/testing';

import {XivApiService2} from 'src/app/shared/api/xivapi/xiv-api-2.service';

describe('XivApiService2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XivApiService2 = TestBed.inject(XivApiService2);
    expect(service).toBeTruthy();
  });
});
