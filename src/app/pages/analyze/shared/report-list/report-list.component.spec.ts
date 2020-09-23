import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AgGridModule } from 'ag-grid-angular';

import { ReportListComponent } from './report-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReportLinksComponent } from 'src/app/pages/analyze/shared/ag-grid-columns/report-links/report-links.component';

describe('ReportListComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, AgGridModule.withComponents(ReportLinksComponent)],
      declarations: [ ReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
