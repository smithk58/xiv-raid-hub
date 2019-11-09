import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AddEditCharacterComponent} from './modals/add-edit-character/add-edit-character.component';
import {AddEditStaticComponent} from './modals/add-edit-static/add-edit-static.component';
import {WatchlistComponent} from './watchlist.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {WatchlistRoutingModule} from './watchlist-routing.module';
import { FriendsCardComponent } from './friends-card/friends-card.component';
import { FriendStaticsCardComponent } from './friend-statics-card/friend-statics-card.component';
import { ComparisonsCardComponent } from './comparisons-card/comparisons-card.component';
import { ComparisonStaticsCardComponent } from './comparison-statics-card/comparison-statics-card.component';
import { UsersStaticsComponent } from './users-statics/users-statics.component';
import { UsersCharactersComponent } from './users-characters/users-characters.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WatchlistRoutingModule
  ],
  declarations: [
    WatchlistComponent,
    AddEditCharacterComponent,
    AddEditStaticComponent,
    FriendsCardComponent,
    FriendStaticsCardComponent,
    ComparisonsCardComponent,
    ComparisonStaticsCardComponent,
    UsersStaticsComponent,
    UsersCharactersComponent
  ],
  entryComponents: [AddEditCharacterComponent, AddEditStaticComponent]
})
export class WatchlistModule { }
