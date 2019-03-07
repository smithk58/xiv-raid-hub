import { Component, OnInit } from '@angular/core';

import {faInfoCircle, faPlus, faTrashAlt, faPen, faFileDownload, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CharacterGroup} from 'src/app/shared/models/character-group';
import {Character} from 'src/app/shared/models/character';
import {Class} from 'src/app/shared/fflogs/models/Class';
import {WatchlistService} from './watchlist.service';
import {AddEditCharacterComponent} from './add-edit-character/add-edit-character.component';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // Icons
  faInfoCircle = faInfoCircle; faPlus = faPlus; faTrash = faTrashAlt; faEdit = faPen; faExport = faFileDownload; faImport = faFileUpload;

  friends: Character[] = [];
  statics: CharacterGroup[] = [];
  classes: Class[];
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.wlService.getFriends().subscribe(characters => {
      this.friends = characters;
    });
  }

  /**
   * Launches a modal for adding/editing character in a users friend list.
   * @param characterId - The character ID to load in the modal, otherwise assumes you want to add a new friend.
   */
  friendListCharacterModal(characterId?: number) {
    const modal = this.modalService.open(AddEditCharacterComponent);
    const isUpdate = typeof(characterId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.selectedCharacter = this.friends.find((character) => character.id === characterId);
    }
    modal.componentInstance.existingCharacterIds = this.friends.reduce((map, character) => {map[character.id] = true; return map; }, {});
    modal.result.then((character) => {
      // Add/update the result in the users friend list
      if (isUpdate) {
        this.wlService.updateFriend(character);
      } else {
        this.wlService.addFriend(character);
      }
      this.notify.success({text: character.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }
  staticModal(staticId: string) {
    const modal = this.modalService.open(AddEditCharacterComponent);
    const isUpdate = typeof(staticId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.selectedStatic = null; // = this.friends.find((character) => character.id === characterId);
    }
    modal.componentInstance.existingCharacterIds = this.friends.reduce((map, character) => {map[character.id] = true; return map; }, {});
    modal.result.then((character) => {
        // Add/update the result in the users friend list
        if (isUpdate) {
          this.wlService.updateFriend(character);
        } else {
          this.wlService.addFriend(character);
        }
        this.notify.success({text: character.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }
  /**
   * Deletes the character with the specified id from the friend list, if found.
   * @param characterId - The character id to delete.
   */
  deleteFriend(characterId: number) {
    const res = this.wlService.deleteFriend(characterId);
    if (res) {
      this.notify.success({text: 'Character was successfully deleted!'});
    }
  }
  importData() {
    // TODO
  }
  exportData() {
    // TODO
  }
}
