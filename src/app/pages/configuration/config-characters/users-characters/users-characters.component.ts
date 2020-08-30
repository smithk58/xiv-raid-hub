import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { faChartBar, faInfoCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';

import {ConfigurationService} from 'src/app/pages/configuration/configuration.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {Character} from 'src/app/shared/api/xiv-raid-hub/models/character';
import {ClassToRole} from 'src/app/shared/Utils';
import {AddEditCharacterComponent} from 'src/app/pages/configuration/modals/add-edit-character/add-edit-character.component';
import {YesNoModalComponent} from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-users-characters',
  templateUrl: './users-characters.component.html',
  styleUrls: ['./users-characters.component.scss']
})
export class UsersCharactersComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faChartBar = faChartBar;
  classToRole = ClassToRole;
  characters$: Subscription;
  characters: Character[] = [];
  constructor(private wlService: ConfigurationService, private modalService: NgbModal, private notify: PNotifyService,
              private router: Router, private ffLogsAPi: FFLogsApiService) { }

  ngOnInit() {
    this.characters$ = this.wlService.getUsersCharacters().subscribe(characters => {
      this.characters = characters;
    });
  }
  /**
   * Launches a modal for adding/editing a character in a users cahracter list.
   * @param characterId - The character ID to load in the modal, otherwise assumes you want to add a new character.
   */
  addEditCharacterModal(character?: Character) {
    const modal = this.modalService.open(AddEditCharacterComponent);
    modal.componentInstance.characterToEdit = character;
    modal.componentInstance.existingCharacterIds = this.characters.reduce((map, char) => {map[char.id] = true; return map; }, {});
    modal.result.then((res) => {
      // Add/update the result in the users character list
      if (character) {
        this.wlService.updateUserCharacter(res);
      } else {
        this.wlService.addUserCharacter(res);
      }
      this.notify.success({text: character.name + ' was successfully ' + (character ? 'updated!' : 'added!')});
    }, () => {} // They aborted, do nothing
    );
  }
  /**
   * Deletes the character with the specified id from the character list, if found.
   * @param characterId - The character id to delete.
   */
  deleteCharacter(character: Character) {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + character.name + ' from your character list?';
    modal.result.then(doDelete => {
      if (doDelete) {
        const res = this.wlService.deleteUserCharacter(character.id);
        if (res) {
          this.notify.success({text: 'Character was successfully deleted!'});
        }
      }
    }, () => {}); // They aborted, do nothing
  }

  /**
   * Opens FFlogs profile for the specified character.
   * @param character - The character to open fflogs for.
   */
  goToFFlogs(character: Character) {
    this.ffLogsAPi.openFFlogsForCharacter(character);
  }
  /**
   * Navigates to the analyze page with this character preselected for analysis.
   * @param characterId - The character id to preselect.
   */
  analyzeCharacter(characterId: number) {
    this.router.navigate(['analyze/character/', characterId]).catch( err => {
      this.notify.error({text: 'There was an error while trying to send you to character analysis. ' + err});
    });
  }
  ngOnDestroy() {
    if (this.characters$) {
      this.characters$.unsubscribe();
    }
  }
}
