import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: ['./modal-footer.component.css']
})
export class ModalFooterComponent {
  @Input() mode: 'save' | 'delete' | 'confirm' | 'close';
  @Input() disabled = false;
  @Output() save = new EventEmitter<Event>();
  @Output() delete = new EventEmitter<Event>();
  @Output() confirm = new EventEmitter<{result: boolean, event: Event}>();
  @Input() autoDismissModal = true;
  @Output() cancel = new EventEmitter<Event>();
  @Output() close = new EventEmitter<Event>();
  constructor(private activeModal: NgbActiveModal) { }
  onSave(event: Event) {
    this.save.emit(event);
  }
  onDelete(event: Event) {
    this.delete.emit(event);
  }
  onConfirm(result: boolean, event: Event) {
    this.confirm.emit({result, event});
  }
  onCancel(event: Event) {
    this.cancel.emit(event);
    if (this.autoDismissModal) {
      this.activeModal.dismiss('Cancel click');
    }
  }
  onClose(event: Event) {
    this.close.emit(event);
    if (this.autoDismissModal) {
      this.activeModal.dismiss('Close click');
    }
  }
}
