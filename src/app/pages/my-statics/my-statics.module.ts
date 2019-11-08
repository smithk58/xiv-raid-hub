import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStaticsComponent } from './my-statics.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {MyStaticsRoutingModule} from 'src/app/pages/my-statics/my-statics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyStaticsRoutingModule
  ],
  declarations: [MyStaticsComponent]
})
export class MyStaticsModule { }
