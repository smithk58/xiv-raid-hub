import { Component, Input, OnInit } from '@angular/core';

import { MyRaidTab } from 'src/app/pages/my-raid/MyRaidTab';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { dayToRaidTimesMap, RaidTime, WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { forkJoin } from 'rxjs';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';

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
  constructor(private raidGroupService: RaidGroupService) { }

  ngOnInit(): void {
    forkJoin([
      this.raidGroupService.getRaidGroups(),
      this.raidGroupService.getRaidTimes()
    ]).subscribe((res) => {
      this.raidGroups = res[0];
      this.dayToRaidTimes = dayToRaidTimesMap(res[1]);
      this.isLoaded = true;
    });
  }
}
