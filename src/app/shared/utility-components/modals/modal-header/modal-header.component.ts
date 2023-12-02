import {Component, EventEmitter, Input, Output} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.css']
})
export class ModalHeaderComponent {
  @Input() title: string;
  @Input() enableClose = true;
  @Input() autoDismissModal = true;
  @Output() modalClose = new EventEmitter<Event>();
  constructor(private activeModal: NgbActiveModal) { }
  onClose(event: Event) {
    this.modalClose.emit(event);
    if (this.autoDismissModal) {
      this.activeModal.dismiss('Cross click');
    }
  }
}
