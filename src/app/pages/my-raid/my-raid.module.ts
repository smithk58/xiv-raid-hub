import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SharedModule} from 'src/app/shared/shared.module';
import {MyRaidComponent} from 'src/app/pages/my-raid/my-raid.component';
import {MyRaidRoutingModule} from 'src/app/pages/my-raid/my-raid-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyRaidRoutingModule
  ],
  declarations: [MyRaidComponent]
})
export class MyRaidModule { }
