import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from 'src/app/shared/shared.module';
import {AnalyzeRoutingModule} from './analyze-routing.module';
import {AnalyzeComponent} from './analyze.component';
import { AnalyzeCharacterComponent } from './analyze-character/analyze-character.component';
import { AnalyzeGroupComponent } from './analyze-group/analyze-group.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AnalyzeRoutingModule
  ],
  declarations: [
    AnalyzeComponent,
    AnalyzeCharacterComponent,
    AnalyzeGroupComponent,
  ]
})
export class AnalyzeModule { }
