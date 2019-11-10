import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MyRaidComponent} from 'src/app/pages/my-raid/my-raid.component';

const routes: Routes = [
  {
    path: '',
    component: MyRaidComponent,
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
export class MyRaidRoutingModule { }
