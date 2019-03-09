import { Component, OnInit } from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {ClassToRole} from 'src/app/shared/Utils';
import {CharacterGroup} from 'src/app/shared/api/models/character-group';
import {AddEditStaticComponent} from '../modals/add-edit-static/add-edit-static.component';
import {WatchlistService} from '../watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-comparison-groups-card',
  templateUrl: './comparison-groups-card.component.html',
  styleUrls: ['./comparison-groups-card.component.css']
})
export class ComparisonGroupsCardComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  classToRole = ClassToRole;

  comparisonGroups: CharacterGroup[] = [];
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.wlService.getComparisonGroups().subscribe(comparisonGroups => {
      this.comparisonGroups = comparisonGroups;
    });
  }
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
  deleteComparisonGroup(groupid: string) {
    const res = this.wlService.deleteComparisonGroup(groupid);
    // TODO confirm prompt
    if (res) {
      this.notify.success({text: 'Comparison group was successfully deleted'});
    }
  }
}
