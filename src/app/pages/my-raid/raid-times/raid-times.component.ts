import { Component, OnDestroy, OnInit } from '@angular/core';

import { faCalendarAlt, faPen, faTrashAlt, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  eachDayOfInterval,
  addDays,
  differenceInSeconds,
  formatDistanceStrict,
  isToday,
  isTomorrow,
  differenceInMilliseconds
} from 'date-fns';
import isPast from 'date-fns/isPast';
import startOfTomorrow from 'date-fns/startOfTomorrow';
import { forkJoin, Subscription, timer } from 'rxjs';
import keyBy from 'lodash/keyBy';

import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
import { dayToRaidTimesMap, WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { RaidDayDisplay, RaidTimeDisplay } from 'src/app/pages/my-raid/raid-times/raid-time-display';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { RaidGroupService } from 'src/app/shared/api/xiv-raid-hub/raid-group.service';

@Component({
  selector: 'app-raid-times',
  templateUrl: './raid-times.component.html',
  styleUrls: ['./raid-times.component.scss']
})
export class RaidTimesComponent implements OnInit, OnDestroy {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faCalendar = faCalendarAlt;
  raidDayDisplays: RaidDayDisplay[] = [];
  countdownFormat = 'H \'hrs\', m \'mins\', s \'secs\'';
  refreshData$: Subscription;
  constructor(private wlService: ConfigurationService, private raidGroupService: RaidGroupService) { }

  ngOnInit(): void {
    // Wait until midnight and refresh the displays, for follow up refreshes wait 24 hrs before refreshing
    const millisUntilMidnight = differenceInMilliseconds(startOfTomorrow(), Date.now());
    const millisInADay = 86400000;
    this.refreshData$ = timer(millisUntilMidnight, millisInADay).subscribe(() => {
      this.initializeData();
    });
    // Initial page data
    this.initializeData();
  }
  initializeData() {
    // Build raid time displays from the statics/schedules
    forkJoin([
      this.raidGroupService.getRaidGroups(),
      this.wlService.getRaidTimes()
    ]).subscribe((res) => {
      const raidGroups = res[0];
      const raidTimes = res[1];
      this.generateRaidTimeDisplays(raidGroups, raidTimes);
    });
  }
  /**
   * Generates the raid time displays for the specified raid groups.
   * @param raidGroups - The list of raid groups for the schedules.
   * @param weeklyRaidTimes - The list of raid times for the raid groups.
   */
  generateRaidTimeDisplays(raidGroups: RaidGroup[], weeklyRaidTimes: WeeklyRaidTime[]) {
    const raidTimesByDay = dayToRaidTimesMap(weeklyRaidTimes);
    const raidGroupMap = keyBy(raidGroups, 'id');
    // Get next 6 dates from today
    const sevenDaysFromNow = addDays(Date.now(), 6);
    const nextSixDays = eachDayOfInterval({ start: new Date(), end: sevenDaysFromNow });
    // Generate displays for the next 7 days
    for (let dateIndex = 0; dateIndex < nextSixDays.length; dateIndex++) {
      const date = nextSixDays[dateIndex];
      // Skip this date if no raid times exist for it
      const raidTimes = raidTimesByDay.get(date.getDay());
      if (!raidTimes) {
        continue;
      }
      // Create a "date" wrapper around raid times to group them in the UI, also calculate how far away the date is away from now
      const daysAwayInWords = this.getDaysAwayInWords(date, dateIndex);
      const raidDayDisplay: RaidDayDisplay = {date, daysAwayInWords, raidTimeDisplays: []};
      // Build out the specific raid times per date
      for (const raidTime of raidTimes) {
        // Clone the date we're currently on and set the time to the current raid time for date/time display
        const raidDateTime = new Date(date.valueOf());
        raidDateTime.setHours(raidTime.startTime.getHours(), raidTime.startTime.getMinutes());
        // Skip any raid times that have already happened today
        if (dateIndex === 0 && isPast(raidDateTime)) {
          continue;
        }
        // Create a display for the current raid time
        const raidTimeDisplay: RaidTimeDisplay = {
          raidGroup: raidGroupMap[raidTime.raidGroupId],
          raidDateTime,
        };
        // Only generate countdowns for today, other days will display time
        if (dateIndex === 0 && isToday(date)) {
          const seconds = differenceInSeconds(raidDateTime, Date.now());
          raidTimeDisplay.countdownConfig = {
            leftTime: seconds,
            format: this.countdownFormat
          };
        }
        raidDayDisplay.raidTimeDisplays.push(raidTimeDisplay);
      }
      // Only add the date display if we added a time display (might not have if its today and the only raid time has already passed)
      if (raidDayDisplay.raidTimeDisplays.length > 0) {
        this.raidDayDisplays.push(raidDayDisplay);
      }
    }
  }

  /**
   * Converts the specified date into a more user friendly distance string of how far away the date is.
   * @param date -
   * @param index -
   */
  getDaysAwayInWords(date: Date, index: number) {
    if (index === 0 && isToday(date)) {
      return 'Today';
    } else if (index === 1 && isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return formatDistanceStrict(date, Date.now(), {unit: 'day', roundingMethod: 'ceil'}) + ' away';
    }
  }

  ngOnDestroy(): void {
    if (this.refreshData$) {
      this.refreshData$.unsubscribe();
    }
  }
}
