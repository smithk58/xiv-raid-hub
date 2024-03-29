import { Component, OnInit } from '@angular/core';

import { concatMap } from 'rxjs/operators';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';

@Component({
  selector: 'app-config-raid-groups',
  templateUrl: './config-raid-groups.component.html',
  styleUrls: ['./config-raid-groups.component.scss']
})
export class ConfigRaidGroupsComponent implements OnInit {
  raidGroups: RaidGroup[];
  constructor(private notify: PNotifyService, private raidGroupService: RaidGroupService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserSession().pipe(
      concatMap(session => {
        return this.raidGroupService.getRaidGroups(session.user.id);
      })
    ).subscribe((raidGroups) => {
      this.raidGroups = raidGroups;
    }, (error) => {
      this.notify.error({text: 'Failed to get raid groups. ' + error});
    });
  }
  addUserRaidGroup(newRaidGroup: RaidGroup) {
    this.raidGroupService.insertRaidGroup(newRaidGroup).subscribe((raidGroup) => {
      this.raidGroups.push(raidGroup);
      this.notify.success({text: '"' + raidGroup.name + '" was successfully added!'});
    }, error => {
      this.notify.error({text: 'Failed to create raid group. ' + error});
    });
  }
  updateUserRaidGroup(raidGroup: RaidGroup) {
    this.raidGroupService.updateRaidGroup(raidGroup).subscribe((updatedRaidGroup) => {
      // Replace the old raidgroup and trigger a UI refresh via a new array
      const existingGroupIndex = this.raidGroups.findIndex((r) => r.id === raidGroup.id);
      this.raidGroups[existingGroupIndex] = updatedRaidGroup;
      this.raidGroups = [].concat(this.raidGroups);
      this.notify.success({text: '"' + updatedRaidGroup.name + '" was successfully updated!'});
    }, error => {
      this.notify.error({text: 'Failed to update raid group. ' + error});
    });
  }
  copyUserRaidGroup(raidGroupId: number) {
    this.raidGroupService.copyRaidGroup(raidGroupId).subscribe((raidGroup) => {
      this.raidGroups.push(raidGroup);
      this.notify.success({text: 'Raid group was successfully copied!'});
    }, error => {
      this.notify.error({text: 'Failed to copy raid group. ' + error});
    });
  }
  deleteUserRaidGroup(raidGroupId: number) {
    this.raidGroupService.deleteRaidGroup(raidGroupId).subscribe((res) => {
      const existingGroupIndex = this.raidGroups.findIndex((r) => r.id === raidGroupId);
      this.raidGroups.splice(existingGroupIndex, 1);
      this.notify.success({text: 'Raid group was successfully deleted!'});
    }, error => {
      this.notify.error({text: 'Failed to delete raid group. ' + error});
    });
  }
  updateRaidGroupSchedule(raidGroupId: number, schedule: WeeklyRaidTime[]) {
    this.raidGroupService.updateRaidGroupsRaidTimes(raidGroupId, schedule).subscribe(raidTimes => {
      // Update hasSchedule on the raid group
      const existingGroupIndex = this.raidGroups.findIndex((r) => r.id === raidGroupId);
      this.raidGroups[existingGroupIndex].hasSchedule = raidTimes.length > 0;
      this.notify.success({text: 'Schedule successfully updated!'});
    }, (error) => {
      this.notify.error({text: 'Failed to update schedule. ' + error});
    });
  }
}
