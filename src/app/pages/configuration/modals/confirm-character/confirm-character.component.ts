import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { UserSession } from 'src/app/shared/api/xiv-raid-hub/models/user-session';
import { CharacterService } from 'src/app/shared/api/xiv-raid-hub/character.service';

@Component({
  selector: 'app-confirm-character',
  templateUrl: './confirm-character.component.html',
  styleUrls: ['./confirm-character.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0
      })),
      transition('open => closed', [
        animate('0.35s')
      ]),
      transition('closed => open', [
        animate('0.35s')
      ]),
    ]),
  ]
})
export class ConfirmCharacterComponent implements OnInit {
  characterId: number;
  chevronDown = faMinus; chevronUp = faPlus;
  showWhy = false;
  showHow = false;
  showDebugging = false;
  failedToFindCode = false;
  attemptingClaim = false;
  session: UserSession;
  constructor(private userService: UserService, private notify: PNotifyService, private modal: NgbActiveModal,
              private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    this.userService.getUserSession().subscribe((session) => {
      this.session = session;
    }, (error) => {
      this.notify.error({text: 'Failed to get user information. ' + error});
    });
  }
  onConfirm(response: {result: boolean, event: Event}) {
    if (response.result) {
      this.attemptConfirm();
    } else {
      this.modal.close(response.result);
    }
  }
  attemptConfirm() {
    this.attemptingClaim = true;
    this.characterService.confirmCharacter(this.characterId).pipe(
      finalize(() => {this.attemptingClaim = false; })
    ).subscribe((succeeded) => {
      if (succeeded) {
        this.notify.success(({text: 'Character successfully claimed!'}));
        this.modal.close(true);
      } else {
        this.failedToFindCode = true;
        this.notify.info({text: 'We didn\'t see the code on your profile. Try some of the debugging steps now shown on the page!'});
      }
    }, error => {
      this.notify.error({text: 'Something unexpected happened while attempting to confirm the character. ' + error});
    });
  }
}
