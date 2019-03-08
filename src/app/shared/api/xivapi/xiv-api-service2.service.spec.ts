import { TestBed } from '@angular/core/testing';

import { XivApiService2Service } from './xiv-api-service2.service';

describe('XivApiService2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XivApiService2Service = TestBed.get(XivApiService2Service);
    expect(service).toBeTruthy();
  });
});
