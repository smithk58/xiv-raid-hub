import { Component, OnInit } from '@angular/core';

import { CharacterGroup } from 'src/app/shared/api/xiv-raid-hub/models/character-group';
import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-config-statics',
  templateUrl: './config-statics.component.html',
  styleUrls: ['./config-statics.component.scss']
})
export class ConfigStaticsComponent implements OnInit {
  statics: CharacterGroup[] = [];
  constructor(private wlService: ConfigurationService, private notify: PNotifyService) { }

  ngOnInit() {
    this.wlService.getUsersStatics().subscribe(statics => {
      this.statics = statics;
    });
  }
  addUserStatic(newStatic: CharacterGroup) {
    this.wlService.addUserStatic(newStatic);
    this.notify.success({text: newStatic.name + ' was successfully added!'});
  }
  updateUserStatic(updatedStatic: CharacterGroup) {
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
