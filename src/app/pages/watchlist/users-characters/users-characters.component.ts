import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {faChartBar, faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';

import {WatchlistService} from 'src/app/pages/watchlist/watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {Character} from 'src/app/shared/api/models/character';
import {ClassToRole} from 'src/app/shared/Utils';
import {AddEditCharacterComponent} from 'src/app/pages/watchlist/modals/add-edit-character/add-edit-character.component';
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
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService,
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
  addEditCharacterModal(characterId?: number) {
    const modal = this.modalService.open(AddEditCharacterComponent);
    const isUpdate = typeof(characterId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.characterToEdit = this.characters.find((character) => character.id === characterId);
    }
    modal.componentInstance.existingCharacterIds = this.characters.reduce((map, character) => {map[character.id] = true; return map; }, {});
    modal.result.then((character) => {
        // Add/update the result in the users character list
        if (isUpdate) {
          this.wlService.updateUserCharacter(character);
        } else {
          this.wlService.addUserCharacter(character);
        }
        this.notify.success({text: character.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }
  /**
   * Deletes the character with the specified id from the character list, if found.
   * @param characterId - The character id to delete.
   */
  deleteCharacter(characterId: number) {
    const modal = this.modalService.open(YesNoModalComponent);
    const character = this.characters.find((char) => char.id === characterId);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + character.name + ' from your character list?';
    modal.result.then(doDelete => {
      if (doDelete) {
        const res = this.wlService.deleteUserCharacter(characterId);
        if (res) {
          this.notify.success({text: 'Character was successfully deleted!'});
        }
      }
    }, () => {});
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
