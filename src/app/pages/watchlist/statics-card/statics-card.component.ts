import { Component, OnInit } from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {WatchlistService} from '../watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {CharacterGroup} from 'src/app/shared/api/models/character-group';
import {AddEditStaticComponent} from '../modals/add-edit-static/add-edit-static.component';

@Component({
  selector: 'app-statics-card',
  templateUrl: './statics-card.component.html',
  styleUrls: ['./statics-card.component.css']
})
export class StaticsCardComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;

  statics: CharacterGroup[] = [];
  constructor(private wlService: WatchlistService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.wlService.getStatics().subscribe(statics => {
      this.statics = statics;
    });
  }
  /**
   * Launches a modal for adding/editing a static in a users static list.
   * @param staticId - The static ID to load in the modal, otherwise assumes you want to add a new static.
   */
  staticModal(staticId?: string) {
    const modal = this.modalService.open(AddEditStaticComponent, {backdrop: 'static'});
    const isUpdate = typeof(staticId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.groupToEdit = this.statics.find((s) => s.id === staticId);
    }
    modal.result.then((nStatic) => {
        // Add/update the result in the users statics
        if (isUpdate) {
          this.wlService.updateStatic(nStatic);
        } else {
          this.wlService.addStatic(nStatic);
        }
        this.notify.success({text: nStatic.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }
  deleteStatic(staticId: string) {
    const res = this.wlService.deleteStatic(staticId);
    // TODO confirm prompt
    if (res) {
      this.notify.success({text: 'Static was successfully deleted'});
    }
  }
}
