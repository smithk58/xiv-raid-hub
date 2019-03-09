import { Component, OnInit } from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {AddEditCharacterComponent} from '../modals/add-edit-character/add-edit-character.component';
import {ClassToRole} from 'src/app/shared/Utils';
import {WatchlistService} from '../watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {Character} from 'src/app/shared/api/models/character';

@Component({
  selector: 'app-friends-card',
  templateUrl: './friends-card.component.html',
  styleUrls: ['./friends-card.component.css']
})
export class FriendsCardComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  classToRole = ClassToRole;
  friends: Character[] = [];
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.wlService.getFriends().subscribe(characters => {
      this.friends = characters;
    });
  }
  /**
   * Launches a modal for adding/editing a character in a users friend list.
   * @param characterId - The character ID to load in the modal, otherwise assumes you want to add a new friend.
   */
  friendListCharacterModal(characterId?: number) {
    const modal = this.modalService.open(AddEditCharacterComponent);
    const isUpdate = typeof(characterId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.characterToEdit = this.friends.find((character) => character.id === characterId);
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
    // TODO confirm prompt
    if (res) {
      this.notify.success({text: 'Character was successfully deleted!'});
    }
  }
}
