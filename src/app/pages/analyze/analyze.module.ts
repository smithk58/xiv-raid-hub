import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgGridModule } from 'ag-grid-angular';

import {SharedModule} from 'src/app/shared/shared.module';
import {AnalyzeRoutingModule} from './analyze-routing.module';
import {AnalyzeComponent} from './analyze.component';
import { AnalyzeCharacterComponent } from './analyze-character/analyze-character.component';
import { AnalyzeGroupComponent } from './analyze-group/analyze-group.component';
import { EncounterToolbarComponent } from './shared/encounter-toolbar/encounter-toolbar.component';
import { ReportListComponent } from './shared/report-list/report-list.component';
import { ReportLinksComponent } from './shared/ag-grid-columns/report-links/report-links.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AnalyzeRoutingModule,
    AgGridModule.withComponents(ReportLinksComponent)
  ],
  declarations: [
    AnalyzeComponent,
    AnalyzeCharacterComponent,
    AnalyzeGroupComponent,
    EncounterToolbarComponent,
    ReportListComponent,
    ReportLinksComponent
  ]
})
export class AnalyzeModule { }
