import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
