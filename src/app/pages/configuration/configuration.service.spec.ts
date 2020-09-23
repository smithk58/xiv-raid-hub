import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('WatchlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SharedModule]
  }));

  it('should be created', () => {
    const service: ConfigurationService = TestBed.inject(ConfigurationService);
    expect(service).toBeTruthy();
  });
});
