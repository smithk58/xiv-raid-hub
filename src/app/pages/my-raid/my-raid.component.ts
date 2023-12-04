import { Component, OnInit } from '@angular/core';

import { dayToRaidTimesMap, RaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { MyRaidTab } from 'src/app/pages/my-raid/MyRaidTab';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Component({
  selector: 'app-my-raid',
  templateUrl: './my-raid.component.html',
  styleUrls: ['./my-raid.component.scss']
})
export class MyRaidComponent implements OnInit {
  tabs: MyRaidTab[] = [];
  tabToSelect: string;
  // Data
  raidGroups: RaidGroup[];
  dayToRaidTimes: Map<number, RaidTime[]>;
  isLoaded = false;
  constructor(private raidGroupService: RaidGroupService, private notify: PNotifyService) { }

  ngOnInit(): void {
    forkJoin([
      this.raidGroupService.getRaidGroups(),
      this.raidGroupService.getRaidTimes()
    ]).pipe(
      finalize(() => {this.isLoaded = true;})
    ).subscribe((res) => {
      this.raidGroups = res[0];
      this.dayToRaidTimes = dayToRaidTimesMap(res[1]);
    }, (error) => {
      this.notify.error({text: 'Failed to get raid groups and times. ' + error});
    });
  }
}
