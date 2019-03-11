import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {WatchlistService} from '../watchlist/watchlist.service';
import {Character} from 'src/app/shared/api/models/character';
import {CharacterGroup} from 'src/app/shared/api/models/character-group';
import {AnalyzeService} from './analyze.service';
import {filter} from 'rxjs/operators';
import {combineLatest} from 'rxjs';
import {PNotifyService} from '../../shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit, OnDestroy {
  constructor(private ffLogApi: FFLogsApiService, private wlService: WatchlistService, private router: Router,
              private notify: PNotifyService
  ) { }
  faInfoCircle = faInfoCircle;
  /*Available characters/groups*/
  friends$; statics$;
  friends: Character[] = [];
  statics: CharacterGroup[] = [];
  ngOnInit() {
    this.friends$ = this.wlService.getFriends().subscribe(friends => {
      this.friends = friends;
    });
    this.statics$ = this.wlService.getStatics().subscribe(statics => {
      this.statics = statics;
    });
  }
  /**
   * Triggered when a character is selected from the character-select input. Triggers analysis on that particular character.
   * @param character - The character that was selected
   */
  characterSelected(character: Character) {
    // Navigate to the character analysis route
    if (character) {
      this.router.navigate(['analyze/character/', character.id]).catch( err => {
        this.notify.error({text: 'There was an error while trying to send you to character analysis. ' + err});
      });
    }
  }
  /**
   * Triggered when a static is selected from the static select input. Triggers analysis on that particular static.
   * @param sStatic - The static that was selected
   */
  staticSelected(sStatic: CharacterGroup) {
    // Navigate to the group analysis route
    this.router.navigate(['analyze/group/', sStatic.id]).catch( err => {
      this.notify.error({text: 'There was an error while trying to send you to group analysis. ' + err});
    });
  }
  ngOnDestroy() {
    if (this.friends$) {
      this.friends$.unsubscribe();
    }
    if (this.statics$) {
      this.statics$.unsubscribe();
    }
  }
}
