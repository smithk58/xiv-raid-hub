import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faChartBar, faCheckSquare, faInfoCircle, faPen, faPlus, faSpinner, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import findIndex from 'lodash/findIndex';

import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { FFLogsApiService } from 'src/app/shared/api/fflogs/fflogs-api.service';
import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { ClassToRole } from 'src/app/shared/Utils';
import { AddEditCharacterComponent } from 'src/app/pages/configuration/modals/add-edit-character/add-edit-character.component';
import { YesNoModalComponent } from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import { ConfirmCharacterComponent } from 'src/app/pages/configuration/modals/confirm-character/confirm-character.component';
import { CharacterService } from 'src/app/shared/api/xiv-raid-hub/character.service';
import { UserCharacter } from 'src/app/shared/api/xiv-raid-hub/models/user-character';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-users-characters',
  templateUrl: './users-characters.component.html',
  styleUrls: ['./users-characters.component.scss']
})
export class UsersCharactersComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faChartBar = faChartBar; faCheck = faCheckSquare;
  faSpinner = faSpinner;
  classToRole = ClassToRole;
  characters: UserCharacter[] = [];
  isLoaded = false;
  constructor(private modalService: NgbModal, private notify: PNotifyService,
              private router: Router, private ffLogsAPi: FFLogsApiService, private characterService: CharacterService) { }

  ngOnInit() {
    this.characterService.getUsersCharacters().pipe(
      finalize(() => {this.isLoaded = true; })
    ).subscribe(characters => {
      this.characters = characters;
    }, (error) => {
      this.notify.error({text: 'Failed to get characters. ' + error});
    });
  }
  /**
   * Launches a modal for adding/editing a character in a users character list.
   * @param character - The character to edit, or nothing if you want to create a character.
   */
  addEditCharacterModal(character?: UserCharacter) {
    const isEdit = !!character;
    // Kinda hacky, but copy usercharacters class to character
    if (isEdit) {
      character.character.defaultClass = character.defaultClass;
    }
    const modal = this.modalService.open(AddEditCharacterComponent);
    modal.componentInstance.characterToEdit = character?.character;
    modal.componentInstance.existingCharacterIds = this.characters.reduce((map, char) => {map[char.characterId] = true; return map; }, {});
    modal.result.then((modalRes) => {
      const action = isEdit ? this.characterService.updateUserCharacter(modalRes) : this.characterService.insertUserCharacter(modalRes);
      action.subscribe((newUserCharacter) => {
        if (isEdit) {
          // Replace the old raidgroup and trigger a UI refresh via a new array
          const existingCharacterIndex = findIndex(this.characters, {characterId: newUserCharacter.characterId});
          this.characters[existingCharacterIndex] = newUserCharacter;
          this.characters = [].concat(this.characters);
        } else {
          this.characters.push(newUserCharacter);
        }
        this.notify.success({text: newUserCharacter.character.name + ' was successfully ' + (isEdit ? 'updated!' : 'added!')});
      }, (error) => {
        this.notify.error({text: 'Failed to ' + (isEdit ? 'update' : 'add') + ' character.' + error});
      });
    }, () => {} // They aborted, do nothing
    );
  }
  /**
   * Deletes the character with the specified id from the character list, if found.
   * @param character - The character to delete.
   */
  deleteCharacter(character: UserCharacter) {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + character.character.name + ' from your character list?';
    modal.result.then(doDelete => {
      if (doDelete) {
        this.characterService.deleteUserCharacter(character.characterId).subscribe((res) => {
          const existingCharacterIndex = findIndex(this.characters, {characterId: character.characterId});
          this.characters.splice(existingCharacterIndex, 1);
          this.notify.success({text: character.character.name + ' was successfully deleted!'});
        }, (error) => {
          this.notify.error({text: 'Failed to delete character.' + error});
        });
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
  confirmCharacter(characterId: number) {
    const modal = this.modalService.open(ConfirmCharacterComponent, {size: 'lg'});
    modal.componentInstance.characterId = characterId;
    modal.result.then(confirmSucceeded => {
      if (confirmSucceeded) {
        const existingCharacterIndex = findIndex(this.characters, {characterId});
        this.characters[existingCharacterIndex].isOwner = true;
      }
    }, () => {}); // They aborted, do nothing
  }
}
