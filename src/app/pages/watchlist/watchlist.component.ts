import { Component, OnInit } from '@angular/core';

import {
  faInfoCircle,
  faPlus,
  faTrashAlt,
  faPen,
  faFileDownload,
  faFileUpload,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CharacterGroup} from 'src/app/shared/api/models/character-group';
import {WatchlistService} from './watchlist.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {AddEditStaticComponent} from './add-edit-static/add-edit-static.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // Icons
  faInfoCircle = faInfoCircle; faPlus = faPlus; faTrash = faTrashAlt; faEdit = faPen; faExport = faFileDownload; faImport = faFileUpload;
  faWarn = faExclamationTriangle;

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
      modal.componentInstance.staticToEdit = this.statics.find((s) => s.id === staticId);
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
  importData() {
    // TODO
  }
  exportData() {
    // TODO
  }
}
