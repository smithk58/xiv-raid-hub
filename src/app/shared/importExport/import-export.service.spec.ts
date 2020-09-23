import { TestBed } from '@angular/core/testing';

import { ImportExportService } from './import-export.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('ImportExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [SharedModule]
  }));

  it('should be created', () => {
    const service: ImportExportService = TestBed.inject(ImportExportService);
    expect(service).toBeTruthy();
  });
});
