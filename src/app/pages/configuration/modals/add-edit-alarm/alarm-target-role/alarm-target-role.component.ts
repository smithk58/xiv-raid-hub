import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { faPen, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import { AlarmDefinition, AlarmType } from 'src/app/shared/api/xiv-raid-hub/models/alarmDefinition';
import { AlarmTargetRole } from 'src/app/pages/configuration/modals/add-edit-alarm/alarm-target-role/alarm-target-role';
import { GuildsService } from 'src/app/shared/api/xiv-raid-hub/guilds.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-alarm-target-role',
  templateUrl: './alarm-target-role.component.html',
  styleUrls: ['./alarm-target-role.component.scss']
})
export class AlarmTargetRoleComponent implements OnInit {
  editRoleMode = false;
  faInfoCircle = faInfoCircle; faEdit = faPen;
  @Input() alarm: AlarmDefinition;
  currentGuildId: string;
  @Input() set guildId(guildId: string) {
    // Clear the role/roles if they change the target guild, since the role will no longer be valid if it was for a previous guild
    if (this.currentGuildId) { // Don't clear on initial set, only on change
      this.setRole(undefined);
      this.discordRoles = undefined;
    }
    this.currentGuildId = guildId;
  }
  currentAlarmType: AlarmType;
  @Input() set alarmType(alarmType: AlarmType) {
    // Clear the role if they change the alarm type to user, since roles only apply to channel alarms
    if (this.currentAlarmType === AlarmType.user) { // Don't clear on initial set, only on change
      this.setRole(undefined);
    }
    this.currentAlarmType = alarmType;
  }
  @Output() roleChange: EventEmitter<AlarmTargetRole> = new EventEmitter();
  // Role form
  roleForm: UntypedFormGroup;
  roleIsSubmitted = false;
  // Roles
  discordRoles: {id: string, name: string}[];
  discordRolesLoading = false;
  constructor(private guildsService: GuildsService, private notify: PNotifyService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      role: [this.alarm?.targetRoleId],
      roleName: [this.alarm?.targetRoleName]
    });
  }
  setRole(role: AlarmTargetRole) {
    this.roleForm?.controls.roleName.setValue(role?.name);
    this.roleChange.emit(role);
  }
  saveRole() {
    this.roleIsSubmitted = true;
    if (this.roleForm.valid) {
      const role = this.discordRoles.find(r => r.id === this.roleForm.controls.role.value);
      this.setRole(role);
      this.editRoleMode = false;
    }
  }
  toggleEditRoleMode() {
    this.editRoleMode = !this.editRoleMode;
    if (this.editRoleMode) {
      // Only attempt to load the roles if they haven't already been loaded
      if (!this.discordRoles) {
        this.getDiscordRoles(this.currentGuildId);
      }
    }
  }
  getDiscordRoles(targetGuildId: string) {
    this.discordRolesLoading = true;
    this.guildsService.getGuildRoles(targetGuildId).pipe(
      finalize(() => {this.discordRolesLoading = false; })
    ).subscribe(roles => {
      this.discordRoles = roles;
    }, (error) => {
      this.notify.error({text: 'Unable to get roles. ' + error});
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.roleForm.controls; }
}
