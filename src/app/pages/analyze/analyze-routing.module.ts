import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AnalyzeComponent} from './analyze.component';
import {AnalyzeCharacterComponent} from './analyze-character/analyze-character.component';
import {AnalyzeGroupComponent} from './analyze-group/analyze-group.component';

const routes: Routes = [
  {
    path: '',
    component: AnalyzeComponent,
    data: {
      reuse: true /*Used by the custom RouteReuseStrategy so navigating to the subroutes doesn't rebuild the existing component*/
    }
  }, {
    path: 'character/:characterId',
    component: AnalyzeCharacterComponent,
    data: {
      reuse: true /*Used by the custom RouteReuseStrategy so navigating to the subroutes doesn't rebuild the existing component*/
    }
  }, {
    path: 'group/:groupId',
    component: AnalyzeGroupComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AnalyzeRoutingModule { }
