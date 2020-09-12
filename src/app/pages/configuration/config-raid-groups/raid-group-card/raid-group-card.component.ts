import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { faCalendarAlt, faInfoCircle, faPen, faPlus, faTrashAlt, faAngry, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
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
  constructor(private wlService: ConfigurationService, private modalService: NgbModal, private raidGroupService: RaidGroupService) { }
  addEditScheduleModal(raidGroupId: number) {
    const modal = this.modalService.open(SchedulerComponent,  {backdrop: 'static', size: 'lg'});
    modal.componentInstance.raidGroupId = raidGroupId;
    modal.result.then((weeklyRaidTimes: WeeklyRaidTime[]) => {
      this.updateSchedule.emit({raidGroupId, weeklyRaidTimes});
    }, () => {}); // They aborted, do nothing
  }
  editRaidGroup(raidGroupId: number) {
    // TODO refactor to get raid group characters instead of full group, which are then appended on to the existing raid group definition
    //  we have, API call should be generic to all raid group types so component is still reusable
    this.raidGroupService.getRaidGroup(raidGroupId).subscribe((raidGroup) => {
      this.openRaidGroupModal(raidGroup);
    });
  }
  openRaidGroupModal(raidGroup?: RaidGroup) {
    const isInsert = typeof(raidGroup) === 'undefined';
    const modal = this.modalService.open(AddEditRaidGroupComponent, {backdrop: 'static', size: 'lg'});
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
    modal.componentInstance.modalText = 'Are you sure you want to delete ' + raidGroup.name + ' from your ' + this.cardSubject + 's?';
    modal.result.then(doDelete => {
      if (doDelete) {
        this.deleteRaidGroup.emit(raidGroup.id);
      }
    }, () => {}); // They aborted, do nothing
  }
}
