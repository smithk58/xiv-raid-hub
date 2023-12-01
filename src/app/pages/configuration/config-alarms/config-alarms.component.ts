import { Component, OnInit } from '@angular/core';

import { faPen, faTrashAlt, faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { AlarmDefinition, AlarmType } from 'src/app/shared/api/xiv-raid-hub/models/alarmDefinition';
import { AddEditAlarmComponent } from 'src/app/pages/configuration/modals/add-edit-alarm/add-edit-alarm.component';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { YesNoModalComponent } from 'src/app/shared/utility-components/modals/yes-no-modal/yes-no-modal.component';
import { AlarmService } from 'src/app/shared/api/xiv-raid-hub/alarm.service';

@Component({
  selector: 'app-config-alarms',
  templateUrl: './config-alarms.component.html',
  styleUrls: ['./config-alarms.component.scss']
})
export class ConfigAlarmsComponent implements OnInit {
  faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faSpinner = faSpinner;
  userAlarmType = AlarmType.user;
  alarms: AlarmDefinition[];
  isLoaded = false;
  constructor(private modalService: NgbModal, private raidGroupService: RaidGroupService, private notify: PNotifyService,
              private alarmService: AlarmService
  ) { }

  ngOnInit(): void {
    this.alarmService.getAllAlarms().subscribe((alarms) => {
      this.alarms = alarms;
      this.isLoaded = true;
    });
  }
  openAlarmModal(alarm?: AlarmDefinition) {
    const isEdit = typeof(alarm) !== 'undefined';
    const modal = this.modalService.open(AddEditAlarmComponent, {backdrop: 'static', size: 'lg'});
    modal.componentInstance.isEdit = isEdit;
    modal.componentInstance.alarm = alarm;
    modal.result.then((modalAlarm: AlarmDefinition) => {
        if (isEdit) {
          // Replace the old alarm and trigger a UI refresh via a new array
          const existingAlarmIndex = this.alarms.findIndex((a) => a.id === alarm.id);
          this.alarms[existingAlarmIndex] = modalAlarm;
          this.alarms = [].concat(this.alarms);
        } else {
          this.alarms.push(modalAlarm);
        }
    },
      () => {} // They aborted modal, do nothing
    );
  }
  deleteAlarm(alarm: AlarmDefinition) {
    const modal = this.modalService.open(YesNoModalComponent);
    modal.componentInstance.modalTitle = 'Delete?';
    modal.componentInstance.modalText = 'Are you sure you want to delete this alarm?';
    modal.result.then(doDelete => {
      if (doDelete) {
        this.alarmService.deleteAlarm(alarm.id).subscribe((res) => {
          const existingAlarmIndex = this.alarms.findIndex((a) => a.id === alarm.id);
          this.alarms.splice(existingAlarmIndex, 1);
          this.notify.success({text: 'Alarm was successfully deleted!'});
        }, (error) => {
          this.notify.error({text: 'Failed to delete alarm.' + error});
        });
      }
    }, () => {}); // They aborted, do nothing
  }
}
