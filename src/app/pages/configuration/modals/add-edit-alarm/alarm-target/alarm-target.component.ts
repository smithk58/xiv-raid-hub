import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';
import { faInfoCircle, faPen } from '@fortawesome/free-solid-svg-icons';

import { GuildsService } from 'src/app/shared/api/xiv-raid-hub/guilds.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { AlarmDefinition, AlarmType } from 'src/app/shared/api/xiv-raid-hub/models/alarmDefinition';
import { AlarmTarget } from 'src/app/pages/configuration/modals/add-edit-alarm/alarm-target/alarm-target';

@Component({
  selector: 'app-alarm-target',
  templateUrl: './alarm-target.component.html',
  styleUrls: ['./alarm-target.component.scss']
})
export class AlarmTargetComponent implements OnInit {
  @Input() alarm: AlarmDefinition;
  currentAlarmType: AlarmType;
  @Input() set alarmType(alarmType: AlarmType) {
    // Clear the target if they change the alarm type
    if (this.currentAlarmType) { // Don't clear on initial set, only on change
      this.setTarget(undefined);
    }
    // Toggle channel required status
    this.setIfChannelRequired(alarmType);
    this.currentAlarmType = alarmType;

    // Populate channels if not already populated (i.e. if they already had a server selected with type user)
    const guildId = this.targetForm ? this.targetForm.get('targetServer').value as string : undefined;
    if (alarmType === AlarmType.channel && guildId) {
      this.getGuildChannels({id: guildId});
    }
  }
  @Output() targetChange: EventEmitter<AlarmTarget> = new EventEmitter();
  editTargetMode = false;
  faInfoCircle = faInfoCircle; faEdit = faPen;
  channelAlarmType = AlarmType.channel;
  // Target form
  targetForm: UntypedFormGroup;
  targetIsSubmitted = false;
  // Server
  discordServers: {id: string, name: string}[];
  discordServersLoading = false;
  // Channels
  discordChannels: {id: string, name: string}[];
  discordChannelsLoading = false;
  constructor(private guildsService: GuildsService, private notify: PNotifyService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    // Initialize target form
    const setChannel = this.alarm && this.alarm.type === AlarmType.channel;
    this.targetForm = this.formBuilder.group({
      targetServer: [this.alarm?.targetGuildId, Validators.required],
      targetChannel: [setChannel ? this.alarm?.targetId : undefined],
      targetName: [this.alarm?.targetName]
    });
    this.setIfChannelRequired(this.alarm?.type);
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

  /**
   * Used to toggle the channel control between being required/not required depending on if the current alarm type is channel or user.
   * @param alarmType - The alarm type to calculate if it's required or not off of.
   */
  setIfChannelRequired(alarmType: AlarmType) {
    if (!alarmType || !this.targetForm) {
      return;
    }
    if (alarmType === AlarmType.channel) {
      this.targetForm.controls.targetChannel.setValidators(Validators.required);
      this.targetForm.controls.targetChannel.updateValueAndValidity();
    } else {
      this.targetForm.controls.targetChannel.clearValidators();
      this.targetForm.controls.targetChannel.updateValueAndValidity();
    }
  }
  setTarget(target: AlarmTarget) {
    this.targetForm?.controls.targetName.setValue(target?.targetName);
    this.targetChange.emit(target);
  }
  saveTarget() {
    this.targetIsSubmitted = true;
    if (this.targetForm.valid) {
      const server = this.discordServers.find(srv => srv.id === this.targetForm.controls.targetServer.value);
      const isChannel = this.currentAlarmType === AlarmType.channel;
      let targetName = server.name + ' / '; //  + (isChannel ? channel.name : 'DM to you');
      if (isChannel) {
        const channel = this.discordChannels.find(chn => chn.id === this.targetForm.controls.targetChannel.value);
        targetName += channel.name;
      } else {
        targetName += 'DM to you';
      }
      // Only set targetID if it's a channel, otherwise backend handles it
      let targetChannelId;
      if (isChannel) {
        targetChannelId = this.targetForm.get('targetChannel').value;
      }
      this.setTarget({
        targetServerId: this.targetForm.get('targetServer').value,
        targetChannelId,
        targetName
      });
      this.editTargetMode = false;
    }
  }
  getAvailableGuilds(targetGuildId?: string) {
    this.discordServersLoading = true;
    this.guildsService.getGuilds(targetGuildId).pipe(
      finalize(() => {this.discordServersLoading = false; })
    ).subscribe(servers => {
      this.discordServers = servers;
      // Grab channels for the target guild id
      if (targetGuildId) {
        const targetGuild = servers.find(s => s.id === targetGuildId);
        this.discordChannels = (targetGuild && targetGuild.channels) ? targetGuild.channels : [];
      }
    }, (error) => {
      this.notify.error({text: 'Unable to get servers. ' + error});
    });
  }
  getGuildChannels(guild: {id: string}) {
    // Don't get channels when it's a user alarm, since it doesn't need channels
    if (this.currentAlarmType === AlarmType.user) {
      return;
    }
    this.discordChannelsLoading = true;
    this.guildsService.getGuildChannels(guild.id).pipe(
      finalize(() => {this.discordChannelsLoading = false; })
    ).subscribe(channels => {
      this.discordChannels = channels;
    }, (error) => {
      this.notify.error({text: 'Unable to get channels for the specified server. ' + error});
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.targetForm.controls; }
}
