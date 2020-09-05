import { Component, OnInit } from '@angular/core';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-config-raid-groups',
  templateUrl: './config-raid-groups.component.html',
  styleUrls: ['./config-raid-groups.component.scss']
})
export class ConfigRaidGroupsComponent implements OnInit {
  raidGroups: RaidGroup[] = [];
  constructor(private wlService: ConfigurationService, private notify: PNotifyService) { }

  ngOnInit() {
    this.wlService.getUsersStatics().subscribe(raidGroups => {
      this.raidGroups = raidGroups;
    });
  }
  addUserStatic(newStatic: RaidGroup) {
    this.wlService.addUserStatic(newStatic);
    this.notify.success({text: newStatic.name + ' was successfully added!'});
  }
  updateUserStatic(updatedStatic: RaidGroup) {
    const res = this.wlService.updateUserStatic(updatedStatic);
    if (res) {
      this.notify.success({text: updatedStatic.name + ' was successfully updated!'});
    }
  }
  deleteUserStatic(staticId: string) {
    const res = this.wlService.deleteUsersStatic(staticId);
    if (res) {
      this.notify.success({text: 'Static was successfully deleted'});
    }
  }
}
