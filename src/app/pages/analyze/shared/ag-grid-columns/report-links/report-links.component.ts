import { Component } from '@angular/core';

import {ICellRendererAngularComp} from 'ag-grid-angular';

import {AnalyzeService} from 'src/app/pages/analyze/analyze.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';

@Component({
  selector: 'app-report-links',
  templateUrl: './report-links.component.html',
  styleUrls: ['./report-links.component.css']
})
export class ReportLinksComponent implements ICellRendererAngularComp {
  public params: any;
  constructor(private analyzeService: AnalyzeService, private ffLogsApi: FFLogsApiService) { }
  agInit(params: any): void {
    this.params = params;
  }
  goToFFlogsReport() {
    const reportId = this.params.data.reportID;
    const fightNumber = this.params.data.fightID;
    this.ffLogsApi.openFFlogsReport(reportId, fightNumber);
  }
  goToXIVAnalysis() {
    const reportId = this.params.data.reportID;
    const fightNumber = this.params.data.fightID;
    this.analyzeService.openXIVAnalysis(reportId, fightNumber);
  }
  refresh(): boolean {
    return false;
  }
}
