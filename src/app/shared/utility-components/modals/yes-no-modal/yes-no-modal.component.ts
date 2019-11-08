import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yes-no-modal',
  templateUrl: './yes-no-modal.component.html',
  styleUrls: ['./yes-no-modal.component.css']
})
export class YesNoModalComponent {

  constructor(private activeModal: NgbActiveModal) { }
  modalTitle: string;
  modalText: string;
  closeModal(clickedYes: boolean) {
    this.activeModal.close(clickedYes);
  }
}
