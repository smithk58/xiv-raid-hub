import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {ConfigurationService} from '../configuration/configuration.service';
import {Character} from 'src/app/shared/api/xiv-raid-hub/models/character';
import {RaidGroup} from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit, OnDestroy {
  constructor(private ffLogApi: FFLogsApiService, private wlService: ConfigurationService, private router: Router,
              private notify: PNotifyService
  ) { }
  faInfoCircle = faInfoCircle;

  /*Available characters/statics*/
  friends$; statics$;
  friends: Character[] = [];
  raidGroups: RaidGroup[] = [];
  ngOnInit() {
    this.friends$ = this.wlService.getFriends().subscribe(friends => {
      this.friends = friends;
    });
    this.statics$ = this.wlService.getFriendStatics().subscribe(statics => {
      this.raidGroups = statics;
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
  staticSelected(sStatic: RaidGroup) {
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
