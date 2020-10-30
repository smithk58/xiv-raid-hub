import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import find from 'lodash/find';

import { GuildsService } from 'src/app/shared/api/xiv-raid-hub/guilds.service';
import { Alarm, AlarmType } from 'src/app/shared/api/xiv-raid-hub/models/alarm';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { AlarmService } from 'src/app/shared/api/xiv-raid-hub/alarm.service';

@Component({
  selector: 'app-add-edit-alarm',
  templateUrl: './add-edit-alarm.component.html',
  styleUrls: ['./add-edit-alarm.component.scss']
})
export class AddEditAlarmComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen;
  alarm: Alarm;
  isEdit = false;
  // Alarm form
  isSubmitted = false;
  alarmForm: FormGroup;
  // Target form
  targetForm: FormGroup;
  targetIsSubmitted = false;
  // Raid group
  raidGroups: RaidGroup[] = [];
  raidGroupsLoading = true;
  // Target type
  targetTypes = [{label: 'Message Discord Channel', value: AlarmType.channel}, {label: 'Direct Message Me', value: AlarmType.user}];
  channelAlarmType = AlarmType.channel;
  // Servers/channels
  discordServers: {id: string, name: string}[];
  discordServersLoading = false;
  discordChannels: {id: string, name: string}[];
  discordChannelsLoading = false;
  editTargetMode = false;
  alarmSaving = false;
  constructor(private modal: NgbActiveModal, private formBuilder: FormBuilder, private guildsService: GuildsService,
              private notify: PNotifyService, private raidGroupService: RaidGroupService, private alarmService: AlarmService
  ) { }

  ngOnInit(): void {
    this.isEdit = typeof(this.alarm) !== 'undefined';
    // Initialize alarm form
    const type = new FormControl(this.isEdit ? this.alarm.type : undefined, Validators.required);
    this.alarmForm = this.formBuilder.group({
      type,
      raidGroup: [this.isEdit ? this.alarm.raidGroupId : undefined, Validators.required],
      hours: [this.isEdit ? this.alarm.offsetHour : 0, [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: [this.isEdit ? this.alarm.offsetMinute : 0,
        [Validators.required, Validators.min(0), Validators.max(59), this.mustBeIncrementOf15]
      ],
      isEnabled: [this.isEdit ? this.alarm.isEnabled : true, Validators.required],
      targetName: [this.isEdit ? this.alarm.targetName: undefined, Validators.required]
    });
    // Initialize target channel form
    const setChannel = this.isEdit && type.value === AlarmType.channel;
    this.targetForm = this.formBuilder.group({
      targetServer: [this.isEdit ? this.alarm.targetGuildId : undefined, Validators.required],
      targetChannel: [setChannel ? this.alarm.targetId : undefined],
    });
    this.targetForm.setValidators(this.channelRequiredIfChannelMode(this.alarmForm));
    this.raidGroupService.getRaidGroups().pipe(
      finalize(() => {this.raidGroupsLoading = false; })
    ).subscribe((raidGroups) => {
      this.raidGroups = raidGroups;
    });
  }
  getAvailableGuilds(targetGuildId?: string) {
    this.discordServersLoading = true;
    this.guildsService.getGuilds(targetGuildId).pipe(
      finalize(() => {this.discordServersLoading = false; })
    ).subscribe(servers => {
      this.discordServers = servers;
      // Grab channels for the target guild id
      if (targetGuildId) {
        const targetGuild = find(servers, {id: targetGuildId});
        this.discordChannels = (targetGuild && targetGuild.channels) ? targetGuild.channels : [];
      }
    }, (error) => {
      this.notify.error({text: 'Unable to get servers. ' + error});
    });
  }
  toggleEditTargetMode() {
    this.editTargetMode = !this.editTargetMode;
    if (this.editTargetMode) {
      // Only attempt to load the guilds if they haven't already been loaded
      if (!this.discordServers) {
        this.getAvailableGuilds(this.targetForm.controls.targetServer.value);
      }
    }
  }
  getGuildChannels(guild: {id: string}) {
    this.discordChannelsLoading = true;
    this.guildsService.getGuildChannels(guild.id).pipe(
      finalize(() => {this.discordChannelsLoading = false; })
    ).subscribe(channels => {
        this.discordChannels = channels;
    }, (error) => {
      this.notify.error({text: 'Unable to get channels for the specified server. ' + error});
    });
  }
  saveServerChannel() {
    this.targetIsSubmitted = true;
    if (this.targetForm.valid) {
      const server = this.discordServers.find(srv => srv.id === this.targetForm.controls.targetServer.value);
      const channel = this.discordChannels.find(chn => chn.id === this.targetForm.controls.targetChannel.value);
      let targetName = server.name;
      if (channel) {
        targetName += (' / ' + channel.name);
      }
      this.alarmForm.controls.targetName.setValue(targetName);
      this.editTargetMode = false;
    }
  }
  saveAlarm() {
    this.isSubmitted = true;
    if (this.alarmForm.valid) {
      const type = this.alarmForm.get('type').value;
      // Only set targetID if it's a channel, otherwise backend handles it
      let targetId;
      if (type === AlarmType.channel) {
        targetId = this.targetForm.get('targetChannel').value;
      }
      const alarm: Alarm = {
        id: this.isEdit ? this.alarm.id : undefined,
        type,
        targetId,
        targetGuildId: this.targetForm.get('targetServer').value,
        offsetHour: parseInt(this.alarmForm.get('hours').value, 10),
        offsetMinute: parseInt(this.alarmForm.get('minutes').value, 10),
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
  channelRequiredIfChannelMode(alarmGroup: FormGroup) {
    return (formGroup: FormGroup) => {
      // Require targetChannel if the alarm group type is set to channel
      if (alarmGroup.controls.type?.value === AlarmType.channel) {
        return Validators.required(formGroup.controls.targetChannel);
      }
      return null;
    };
    /*if (formGroup.controls.type?.value === AlarmType.channel) {
      return Validators.required(formGroup.controls.targetName);
    }
    return null;*/
  }
  mustBeIncrementOf15(formControl: FormControl) {
    const minute = formControl.value;
    if (minute % 15 !== 0) {
      return {not15Increment: true};
    }
    return null;
  }
  // convenience getter for easy access to form fields
  get f() { return this.alarmForm.controls; }
  get t() { return this.targetForm.controls; }
}
