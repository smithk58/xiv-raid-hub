import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountdownModule } from 'ngx-countdown';

import { SharedModule } from 'src/app/shared/shared.module';
import { MyRaidComponent } from 'src/app/pages/my-raid/my-raid.component';
import { MyRaidRoutingModule } from 'src/app/pages/my-raid/my-raid-routing.module';
import { RaidTimesComponent } from './raid-times/raid-times.component';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyRaidRoutingModule,
    CountdownModule
  ],
  declarations: [MyRaidComponent, RaidTimesComponent, ScheduleComponent]
})
export class MyRaidModule { }
