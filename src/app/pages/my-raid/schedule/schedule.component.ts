import { Component, Input } from '@angular/core';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { RaidDayDisplay, RaidTimeDisplay } from 'src/app/pages/my-raid/schedule/raid-time-display';
import { DaysOfWeek } from 'src/app/shared/DaysUtils';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  faSpinner = faSpinner;
  @Input() raidGroups: RaidGroup[];
  @Input() dayToRaidTimes: Map<number, RaidTime[]>;
  hasDays: boolean;
  isReady = false;
  @Input() set dataReady(ready: boolean) {
    if (ready) {
      this.hasDays = this.dayToRaidTimes.size > 0;
      this.generateRaidTimeDisplays(this.raidGroups, this.dayToRaidTimes);
      this.isReady = true;
    }
  }
  raidDayDisplays: RaidDayDisplay[];
  constructor() { }

  generateRaidTimeDisplays(raidGroups: RaidGroup[], raidTimes: Map<number, RaidTime[]>) {
    const raidGroupMap = raidGroups.reduce((map, rGroup) =>  {
      map[rGroup.id] = rGroup;
      return map;
    }, {});
    const raidDayDisplays: RaidDayDisplay[] = [];
    for (const day of DaysOfWeek.values()) {
      const rTimes = raidTimes.get(day.jsDay);
      if (!rTimes) {
        continue;
      }
      const raidDay: RaidDayDisplay = {
        day: day.dayLong,
        raidTimeDisplays: []
      };
      for (const raidTime of rTimes) {
        // Create a date for today and apply the raid times time to it
        const raidDateTime = new Date();
        raidDateTime.setHours(raidTime.startTime.getHours(), raidTime.startTime.getMinutes());
        // Create a display for the current raid time
        const raidTimeDisplay: RaidTimeDisplay = {
          raidGroup: raidGroupMap[raidTime.raidGroupId],
          raidDateTime,
        };
        raidDay.raidTimeDisplays.push(raidTimeDisplay);
      }
      raidDayDisplays.push(raidDay);
    }
    this.raidDayDisplays = raidDayDisplays;
  }
}
