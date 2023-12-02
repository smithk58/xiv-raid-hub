import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

import { AlarmDefinition, AlarmType } from 'src/app/shared/api/xiv-raid-hub/models/alarmDefinition';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { AlarmService } from 'src/app/shared/api/xiv-raid-hub/alarm.service';
import { AlarmTarget } from 'src/app/pages/configuration/modals/add-edit-alarm/alarm-target/alarm-target';
import { AlarmTargetRole } from 'src/app/pages/configuration/modals/add-edit-alarm/alarm-target-role/alarm-target-role';

@Component({
  selector: 'app-add-edit-alarm',
  templateUrl: './add-edit-alarm.component.html',
  styleUrls: ['./add-edit-alarm.component.scss']
})
export class AddEditAlarmComponent implements OnInit {
  faInfoCircle = faInfoCircle; faPlus = faPlus;
  channelAlarmType = AlarmType.channel;
  alarm: AlarmDefinition;
  isEdit = false;
  // Alarm form
  isSubmitted = false;
  alarmForm: UntypedFormGroup;
  // Raid group
  raidGroups: RaidGroup[] = [];
  raidGroupsLoading = true;
  // Target
  targetTypes = [{label: 'Message Discord Channel', value: AlarmType.channel}, {label: 'Direct Message Me', value: AlarmType.user}];
  alarmSaving = false;
  constructor(private modal: NgbActiveModal, private formBuilder: UntypedFormBuilder,
              private notify: PNotifyService, private raidGroupService: RaidGroupService, private alarmService: AlarmService
  ) { }

  ngOnInit(): void {
    this.isEdit = typeof(this.alarm) !== 'undefined';
    // Initialize alarm form
    const target: AlarmTarget = this.isEdit ? {
      targetServerId: this.alarm.targetGuildId,
      targetChannelId: this.alarm.type === AlarmType.channel ? this.alarm.targetId : undefined,
      targetName: this.alarm.targetName
    } : undefined;
    const role: AlarmTargetRole = this.isEdit ? {
        id: this.alarm.targetRoleId,
        name: this.alarm.targetRoleName
    } : undefined;

    this.alarmForm = this.formBuilder.group({
      type: [this.isEdit ? this.alarm.type : undefined, Validators.required],
      raidGroup: [this.isEdit ? this.alarm.raidGroupId : undefined, Validators.required],
      hours: [this.isEdit ? this.alarm.offsetHour : 0, [Validators.required, Validators.min(0), Validators.max(23)]],
      isEnabled: [this.isEdit ? this.alarm.isEnabled : true, Validators.required],
      target: [target, Validators.required],
      role: [role]
    });

    this.raidGroupService.getRaidGroups().pipe(
      finalize(() => {this.raidGroupsLoading = false; })
    ).subscribe((raidGroups) => {
      this.raidGroups = raidGroups;
    });
  }
  saveAlarm() {
    this.isSubmitted = true;
    if (this.alarmForm.valid) {
      const type = this.alarmForm.get('type').value;
      const target = this.alarmForm.get('target').value;
      // Only set targetID if it's a channel, otherwise backend handles it
      let targetId;
      if (type === AlarmType.channel) {
        targetId = target.targetChannelId;
      }
      // Only set roleID if it's a channel and they selected a role
      const role = this.alarmForm.get('role').value as AlarmTargetRole;
      let roleId;
      if (type === AlarmType.channel && role) {
        roleId = role.id;
      }
      const alarm: AlarmDefinition = {
        id: this.isEdit ? this.alarm.id : undefined,
        type,
        targetId,
        targetGuildId: target.targetServerId,
        targetRoleId: roleId,
        offsetHour: parseInt(this.alarmForm.get('hours').value, 10),
        isEnabled: this.alarmForm.get('isEnabled').value,
        raidGroupId: this.alarmForm.get('raidGroup').value
      };
      this.alarmSaving = true;
      const action = this.isEdit ? this.alarmService.updateAlarm(alarm) : this.alarmService.insertAlarm(alarm);
      action.pipe(
        finalize(() => {this.alarmSaving = false; })
      ).subscribe((resAlarm) => {
        this.notify.success({text: 'The alarm was successfully ' + (this.isEdit ? 'updated!' : 'added!')});
        this.modal.close(resAlarm);
      }, (error) => {
        this.notify.error({text: 'Failed to ' + (this.isEdit ? 'update' : 'add') + ' alarm. ' + error});
      });
    }
  }

  /**
   * Called with a new target when the user saves a new target via the alarm-target component.
   * @param newTarget -
   */
  targetChanged(newTarget: AlarmTarget) {
    this.alarmForm.controls.target.setValue(newTarget);
  }

  /**
   * Called with a new role when the user saves a new role via the alar-target-role component.
   * @param newRole -
   */
  roleChanged(newRole: AlarmTargetRole) {
    this.alarmForm.controls.role.setValue(newRole);
  }
  inviteBot() {
    window.open('https://discord.com/oauth2/authorize?client_id=746485131534925974&scope=bot&permissions=3072', '_blank');
  }
  // convenience getter for easy access to form fields
  get f() { return this.alarmForm.controls; }
}
