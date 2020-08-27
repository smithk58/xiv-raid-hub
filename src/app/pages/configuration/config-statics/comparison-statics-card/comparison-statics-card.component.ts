import {Component, OnDestroy, OnInit} from '@angular/core';

import {faInfoCircle, faPen, faPlus, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';

import {CharacterGroup} from 'src/app/shared/api/xiv-raid-hub/models/character-group';
import {AddEditStaticComponent} from 'src/app/pages/configuration/modals/add-edit-static/add-edit-static.component';
import {ConfigurationService} from 'src/app/pages/configuration/configuration.service';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {YesNoModalComponent} from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';

@Component({
  selector: 'app-comparison-statics-card',
  templateUrl: './comparison-statics-card.component.html',
  styleUrls: ['./comparison-statics-card.component.css']
})
export class ComparisonStaticsCardComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt;
  comparisonStatics$: Subscription;

  comparisonStatics: CharacterGroup[] = [];
  constructor(private wlService: ConfigurationService, private modalService: NgbModal, private notify: PNotifyService) { }

  ngOnInit() {
    this.comparisonStatics$ = this.wlService.getComparisonStatics().subscribe(comparisonStatics => {
      this.comparisonStatics = comparisonStatics;
    });
  }

  /**
   * Launches a modal for adding/editing a comparison static.
   * @param staticId - The id of the static to load in the modal, otherwise assumes you want to add a new comparison static.
   */
  comparisonStaticsModal(staticId?: string) {
    const modal = this.modalService.open(AddEditStaticComponent, {backdrop: 'static'});
    const isUpdate = typeof(staticId) !== 'undefined';
    // Populate the character on the modal if this is an edit attempt
    if (isUpdate) {
      modal.componentInstance.staticToEdit = this.comparisonStatics.find((s) => s.id === staticId);
    }
    modal.result.then((group) => {
        // Add/update the result in the users statics
        if (isUpdate) {
          this.wlService.updateComparisonStatic(group);
        } else {
          this.wlService.addComparisonStatic(group);
        }
        this.notify.success({text: group.name + ' was successfully ' + (isUpdate ? 'updated!' : 'added!')});
      }, () => {}
    );
  }

  /**
   * Deletes the comparison static with the specified id from the comparison statics list, if found.
   * @param staticId - The static id to delete.
   */
  deleteComparisonStatic(staticId: string) {
    const modal = this.modalService.open(YesNoModalComponent);
    const cStatic = this.comparisonStatics.find((group) => group.id === staticId);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + cStatic.name + ' from your comparison statics?';
    modal.result.then(doDelete => {
      if (doDelete) {
        const res = this.wlService.deleteComparisonStatic(staticId);
        if (res) {
          this.notify.success({text: 'Comparison static was successfully deleted'});
        }
      }
    }, () => {});
  }
  ngOnDestroy() {
    if (this.comparisonStatics$) {
      this.comparisonStatics$.unsubscribe();
    }
  }
}
