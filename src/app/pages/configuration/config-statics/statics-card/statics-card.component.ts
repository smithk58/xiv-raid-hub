import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { faCalendar, faInfoCircle, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CharacterGroup } from 'src/app/shared/api/xiv-raid-hub/models/character-group';
import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
import { AddEditStaticComponent } from 'src/app/pages/configuration/modals/add-edit-static/add-edit-static.component';
import { YesNoModalComponent } from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-statics-card',
  templateUrl: './statics-card.component.html',
  styleUrls: ['./statics-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StaticsCardComponent {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faCalendar = faCalendar;
  @Input() cardSubject: string;
  @Input() tooltip: string;
  @Input() statics: CharacterGroup[] = [];
  @Output() addStatic: EventEmitter<CharacterGroup> = new EventEmitter();
  @Output() updateStatic: EventEmitter<CharacterGroup> = new EventEmitter();
  @Output() deleteStatic: EventEmitter<string> = new EventEmitter();
  constructor(private wlService: ConfigurationService, private modalService: NgbModal) { }

  addEditCalendarModal(staticId?: string) {
    // a
  }
  addEditStaticModal(staticId?: string) {
    const modal = this.modalService.open(AddEditStaticComponent, {backdrop: 'static', size: 'lg'});
    const isUpdate = typeof(staticId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.groupToEdit = this.statics.find((s) => s.id === staticId);
    }
    modal.result.then((group) => {
        // Add/update the result in the users statics
        if (isUpdate) {
          this.updateStatic.emit(group);
        } else {
          this.addStatic.emit(group);
        }
      }, () => {} // They aborted, do nothing
    );
  }
  deleteStaticModal(staticId: string) {
    const modal = this.modalService.open(YesNoModalComponent);
    const cStatic = this.statics.find((group) => group.id === staticId);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + cStatic.name + ' from your ' + this.cardSubject + 's?';
    modal.result.then(doDelete => {
      if (doDelete) {
        this.deleteStatic.emit(staticId);
      }
    }, () => {}); // They aborted, do nothing
  }
}
