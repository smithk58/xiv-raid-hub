import { TestBed, inject } from '@angular/core/testing';

import { configureTestSuite } from 'ng-bullet';

import { PNotifyService } from './pnotify-service.service';

describe('PNotifyService', () => {
 configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [PNotifyService]
    });
  });

  /*it('should be created', inject([PNotifyService], (service: PNotifyService) => {
    expect(service).toBeTruthy();
  }));*/
});
