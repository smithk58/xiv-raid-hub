import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { faCalendarAlt, faInfoCircle, faPen, faPlus, faTrashAlt, faAngry, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { AddEditRaidGroupComponent } from 'src/app/pages/configuration/modals/add-edit-raid-group/add-edit-raid-group.component';
import { YesNoModalComponent } from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import { SchedulerComponent } from 'src/app/pages/configuration/modals/scheduler/scheduler.component';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';

@Component({
  selector: 'app-raid-group-card',
  templateUrl: './raid-group-card.component.html',
  styleUrls: ['./raid-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RaidGroupCardComponent {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faCalendar = faCalendarAlt; faAngry = faAngry;
  faSpinner = faSpinner;
  @Input() cardSubject: string;
  @Input() tooltip: string;
  @Input() raidGroups: RaidGroup[];
  @Input() isLoaded = false;
  @Output() addRaidGroup: EventEmitter<RaidGroup> = new EventEmitter();
  @Output() updateRaidGroup: EventEmitter<RaidGroup> = new EventEmitter();
  @Output() deleteRaidGroup: EventEmitter<number> = new EventEmitter();
  @Output() updateSchedule: EventEmitter<{ raidGroupId: number, weeklyRaidTimes: WeeklyRaidTime[]}> = new EventEmitter();
  constructor(private modalService: NgbModal, private raidGroupService: RaidGroupService) { }
  addEditScheduleModal(raidGroup: RaidGroup) {
    const modal = this.modalService.open(SchedulerComponent,  {backdrop: 'static', size: 'lg'});
    modal.componentInstance.canEdit = raidGroup.isOwner;
    modal.componentInstance.raidGroupId = raidGroup.id;
    modal.result.then((weeklyRaidTimes: WeeklyRaidTime[]) => {
      this.updateSchedule.emit({raidGroupId: raidGroup.id, weeklyRaidTimes});
    }, () => {}); // They aborted, do nothing
  }
  editRaidGroup(raidGroup: RaidGroup) {
    // TODO refactor to get raid group characters instead of full group, which are then appended on to the existing raid group definition
    //  we have, API call should be generic to all raid group types so component is still reusable
    this.raidGroupService.getRaidGroup(raidGroup.id).subscribe((detailedRaidGroup) => {
      this.openRaidGroupModal(detailedRaidGroup);
    });
  }
  openRaidGroupModal(raidGroup?: RaidGroup) {
    const isInsert = typeof(raidGroup) === 'undefined';
    const modal = this.modalService.open(AddEditRaidGroupComponent, {backdrop: 'static', size: 'lg'});
    modal.componentInstance.canEdit = isInsert ? true : raidGroup.isOwner;
    modal.componentInstance.raidGroup = raidGroup;
    modal.result.then((modalRaidGroup: RaidGroup) => {
      if (isInsert) {
        this.addRaidGroup.emit(modalRaidGroup);
      } else {
        this.updateRaidGroup.emit(modalRaidGroup);
      }
    },
      () => {} // They aborted modal, do nothing
    );
  }
  deleteRaidGroupModal(raidGroup: RaidGroup) {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.modalTitle = 'Delete?';
    let modalText = 'Are you sure you want to delete ' + raidGroup.name + ' from your ' + this.cardSubject + 's?';
    if (!raidGroup.isOwner) {
      modalText += '<p class="mt-2">Since you\'re not the owner of this group you will only be removing yourself from the group.</p>';
    }
    modal.componentInstance.modalText = modalText;
    modal.result.then(doDelete => {
      if (doDelete) {
        this.deleteRaidGroup.emit(raidGroup.id);
      }
    }, () => {}); // They aborted, do nothing
  }
}
