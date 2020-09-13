import { Component, Input } from '@angular/core';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidTime, DaysInWeekNum, DayToDayNumber } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { RaidDayDisplay, RaidTimeDisplay } from 'src/app/pages/my-raid/schedule/raid-time-display';


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
      this.generateRaidTimeDisplays();
      this.isReady = true;
    }
  }
  raidDayDisplays: RaidDayDisplay[];
  constructor() { }

  generateRaidTimeDisplays() {
    const raidDayDisplays: RaidDayDisplay[] = [];
    const raidTimes = this.dayToRaidTimes;
    for (const day of DaysInWeekNum) {
      const rTimes = raidTimes.get(day);
      if (!rTimes) {
        continue;
      }
      const raidDay: RaidDayDisplay = {
        day: DayToDayNumber[day],
        raidTimeDisplays: []
      };
      for (const raidTime of rTimes) {
        // Create a date for today and apply the raid times time to it
        const raidDateTime = new Date();
        raidDateTime.setHours(raidTime.startTime.getHours(), raidTime.startTime.getMinutes());
        // Create a display for the current raid time
        const raidTimeDisplay: RaidTimeDisplay = {
          raidGroup: this.raidGroups[0], // TODO raidGroupMap[raidTime.raidGroupId],
          raidDateTime,
        };
        raidDay.raidTimeDisplays.push(raidTimeDisplay);
      }
      raidDayDisplays.push(raidDay);
    }
    this.raidDayDisplays = raidDayDisplays;
  }
}
