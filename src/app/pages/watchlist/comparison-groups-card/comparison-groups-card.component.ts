import {Component, OnDestroy, OnInit} from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CharacterGroup} from 'src/app/shared/api/models/character-group';
import {AddEditStaticComponent} from '../modals/add-edit-static/add-edit-static.component';
import {WatchlistService} from '../watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {YesNoModalComponent} from '../../../shared/utility-components/yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-comparison-groups-card',
  templateUrl: './comparison-groups-card.component.html',
  styleUrls: ['./comparison-groups-card.component.css']
})
export class ComparisonGroupsCardComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  comparisonGroups$;

  comparisonGroups: CharacterGroup[] = [];
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.comparisonGroups$ = this.wlService.getComparisonGroups().subscribe(comparisonGroups => {
      this.comparisonGroups = comparisonGroups;
    });
  }

  /**
   * Launches a modal for adding/editing a comparison group.
   * @param groupId - The id of the group to load in the modal, otherwise assumes you want to add a new comparison group.
   */
  comparisonGroupModal(groupId: string) {
    const modal = this.modalService.open(AddEditStaticComponent, {backdrop: 'static'});
    const isUpdate = typeof(groupId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.groupToEdit = this.comparisonGroups.find((s) => s.id === groupId);
    }
    modal.result.then((group) => {
        // Add/update the result in the users statics
        if (isUpdate) {
          this.wlService.updateComparisonGroup(group);
        } else {
          this.wlService.addComparisonGroup(group);
        }
        this.notify.success({text: group.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }

  /**
   * Deletes the comparison group with the specified id from the comparison groups list, if found.
   * @param groupId - The group id to delete.
   */
  deleteComparisonGroup(groupId: string) {
    const modal = this.modalService.open(YesNoModalComponent);
    const cGroup = this.comparisonGroups.find((group) => group.id === groupId);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + cGroup.name + ' from your comparison groups?';
    modal.result.then(doDelete => {
      if (doDelete) {
        const res = this.wlService.deleteComparisonGroup(groupId);
        if (res) {
          this.notify.success({text: 'Comparison group was successfully deleted'});
        }
      }
    }, () => {});
  }
  ngOnDestroy() {
    if (this.comparisonGroups$) {
      this.comparisonGroups$.unsubscribe();
    }
  }
}
