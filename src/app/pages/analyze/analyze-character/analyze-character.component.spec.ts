import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AnalyzeCharacterComponent } from './analyze-character.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EncounterToolbarComponent } from 'src/app/pages/analyze/shared/encounter-toolbar/encounter-toolbar.component';
import { ReportListComponent } from 'src/app/pages/analyze/shared/report-list/report-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { ReportLinksComponent } from 'src/app/pages/analyze/shared/ag-grid-columns/report-links/report-links.component';

describe('AnalyzeCharacterComponent', () => {
  let component: AnalyzeCharacterComponent;
  let fixture: ComponentFixture<AnalyzeCharacterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SharedModule,
        AgGridModule.withComponents(ReportLinksComponent)
      ],
      declarations: [AnalyzeCharacterComponent, EncounterToolbarComponent, ReportListComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
