import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {AddEditCharacterComponent} from './modals/add-edit-character/add-edit-character.component';
import {AddEditStaticComponent} from './modals/add-edit-static/add-edit-static.component';
import {WatchlistComponent} from './watchlist.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {WatchlistRoutingModule} from './watchlist-routing.module';
import { FriendsCardComponent } from './friends-card/friends-card.component';
import { StaticsCardComponent } from './statics-card/statics-card.component';
import { ComparisonsCardComponent } from './comparisons-card/comparisons-card.component';
import { ComparisonGroupsCardComponent } from './comparison-groups-card/comparison-groups-card.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    WatchlistRoutingModule
  ],
  declarations: [
    WatchlistComponent,
    AddEditCharacterComponent,
    AddEditStaticComponent,
    FriendsCardComponent,
    StaticsCardComponent,
    ComparisonsCardComponent,
    ComparisonGroupsCardComponent
  ],
  entryComponents: [AddEditCharacterComponent, AddEditStaticComponent]
})
export class WatchlistModule { }
