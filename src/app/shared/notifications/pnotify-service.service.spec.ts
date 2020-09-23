import { TestBed } from '@angular/core/testing';

import { PNotifyService } from './pnotify-service.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PNotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SharedModule]
  }));

  it('should be created', () => {
    const service: PNotifyService = TestBed.inject(PNotifyService);
    expect(service).toBeTruthy();
  });
});
