import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MyStaticsComponent} from 'src/app/pages/my-statics/my-statics.component';

const routes: Routes = [
  {
    path: '',
    component: MyStaticsComponent,
    data: {
      reuse: true /*Used by the custom RouteReuseStrategy so navigating to the subroutes doesn't rebuild the existing component*/
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyStaticsRoutingModule { }
