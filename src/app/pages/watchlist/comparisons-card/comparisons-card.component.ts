import {Component, OnDestroy, OnInit} from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {Character} from 'src/app/shared/api/models/character';
import {ClassToRole} from 'src/app/shared/Utils';
import {AddEditCharacterComponent} from '../modals/add-edit-character/add-edit-character.component';
import {WatchlistService} from '../watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {YesNoModalComponent} from '../../../shared/utility-components/yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-comparisons-card',
  templateUrl: './comparisons-card.component.html',
  styleUrls: ['./comparisons-card.component.css']
})
export class ComparisonsCardComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  classToRole = ClassToRole;

  comparisonTargets$;
  comparisonTargets: Character[] = [];
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.comparisonTargets$ = this.wlService.getComparisonTargets().subscribe(comparisonTargets => {
      this.comparisonTargets = comparisonTargets;
    });
  }

  /**
   * Launches a modal for adding/editing a comparison target.
   * @param characterId - The character ID to load in the modal, otherwise assumes you want to add a new comparison target.
   */
  comparisonTargetModal(characterId?: number) {
    const modal = this.modalService.open(AddEditCharacterComponent);
    const isUpdate = typeof(characterId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.characterToEdit = this.comparisonTargets.find((character) => character.id === characterId);
    }
    const existing = this.comparisonTargets.reduce((map, character) => {map[character.id] = true; return map; }, {});
    modal.componentInstance.existingCharacterIds = existing;
    modal.result.then((character) => {
        // Add/update the result in the users friend list
        if (isUpdate) {
          this.wlService.updateComparisonTarget(character);
        } else {
          this.wlService.addComparisonTarget(character);
        }
        this.notify.success({text: character.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }

  /**
   * Deletes the character with the specified id from the comparison targets list, if found.
   * @param characterId - The character id to delete.
   */
  deleteComparisonTarget(characterId: number) {
    const modal = this.modalService.open(YesNoModalComponent);
    const cTarget = this.comparisonTargets.find((character) => character.id === characterId);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + cTarget.name + ' from your comparison targets?';
    modal.result.then(doDelete => {
      if (doDelete) {
        const res = this.wlService.deleteComparisonTarget(characterId);
        if (res) {
          this.notify.success({text: 'Comparison target was successfully deleted'});
        }
      }
    }, () => {});
  }
  ngOnDestroy() {
    if (this.comparisonTargets$) {
      this.comparisonTargets$.unsubscribe();
    }
  }
}
