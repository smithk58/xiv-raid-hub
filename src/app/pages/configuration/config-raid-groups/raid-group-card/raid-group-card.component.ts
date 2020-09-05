import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { faCalendarAlt, faInfoCircle, faPen, faPlus, faTrashAlt, faAngry } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
import { AddEditStaticComponent } from 'src/app/pages/configuration/modals/add-edit-static/add-edit-static.component';
import { YesNoModalComponent } from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import { SchedulerComponent } from 'src/app/pages/configuration/modals/scheduler/scheduler.component';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

@Component({
  selector: 'app-raid-group-card',
  templateUrl: './raid-group-card.component.html',
  styleUrls: ['./raid-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RaidGroupCardComponent {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faCalendar = faCalendarAlt; faAngry = faAngry;
  @Input() cardSubject: string;
  @Input() tooltip: string;
  @Input() raidGroups: RaidGroup[] = [];
  @Output() addStatic: EventEmitter<RaidGroup> = new EventEmitter();
  @Output() updateStatic: EventEmitter<RaidGroup> = new EventEmitter();
  @Output() deleteStatic: EventEmitter<string> = new EventEmitter();
  constructor(private wlService: ConfigurationService, private modalService: NgbModal) { }

  addEditCalendarModal(group: RaidGroup) {
    const modal = this.modalService.open(SchedulerComponent,  {backdrop: 'static', size: 'lg'});
    modal.componentInstance.raidTimes = group.weeklyRaidTimes;
    modal.result.then((raidTimes: WeeklyRaidTime[]) => {
      group.weeklyRaidTimes = raidTimes;
      this.updateStatic.emit(group);
    }, () => {}); // They aborted, do nothing
  }
  addEditStaticModal(group?: RaidGroup) {
    const modal = this.modalService.open(AddEditStaticComponent, {backdrop: 'static', size: 'lg'});
    modal.componentInstance.groupToEdit = group;
    modal.result.then((res: RaidGroup) => {
      // Add/update the result in the users statics
      if (group) {
        this.updateStatic.emit(res);
      } else {
        this.addStatic.emit(res);
      }
    }, () => {} // They aborted, do nothing
    );
  }
  deleteStaticModal(group: RaidGroup) {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + group.name + ' from your ' + this.cardSubject + 's?';
    modal.result.then(doDelete => {
      if (doDelete) {
        this.deleteStatic.emit(group.id);
      }
    }, () => {}); // They aborted, do nothing
  }
}
