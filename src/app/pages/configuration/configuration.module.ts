import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditCharacterComponent } from './modals/add-edit-character/add-edit-character.component';
import { AddEditStaticComponent } from './modals/add-edit-static/add-edit-static.component';
import { ConfigurationComponent } from './configuration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { FriendsCardComponent } from './config-characters/friends-card/friends-card.component';
import { ComparisonsCardComponent } from './config-characters/comparisons-card/comparisons-card.component';
import { UsersCharactersComponent } from './config-characters/users-characters/users-characters.component';
import { ConfigCharactersComponent } from './config-characters/config-characters.component';
import { ConfigStaticsComponent } from './config-statics/config-statics.component';
import { StaticsCardComponent } from './config-statics/statics-card/statics-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationRoutingModule
  ],
  declarations: [
    ConfigurationComponent,
    AddEditCharacterComponent,
    AddEditStaticComponent,
    FriendsCardComponent,
    ComparisonsCardComponent,
    UsersCharactersComponent,
    ConfigCharactersComponent,
    ConfigStaticsComponent,
    StaticsCardComponent
  ],
  entryComponents: [AddEditCharacterComponent, AddEditStaticComponent]
})
export class ConfigurationModule { }
