import { Component, OnInit } from '@angular/core';

import { faCalendarAlt, faPen, faTrashAlt, faInfoCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { eachDayOfInterval, addDays, differenceInSeconds } from 'date-fns';

import { ConfigurationService } from 'src/app/pages/configuration/configuration.service';
import { dayToRaidTimesMap } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { RaidTimeDisplay } from 'src/app/pages/my-raid/raid-times/raid-time-display';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';

@Component({
  selector: 'app-raid-times',
  templateUrl: './raid-times.component.html',
  styleUrls: ['./raid-times.component.scss']
})
export class RaidTimesComponent implements OnInit {
  faInfoCircle = faInfoCircle; faEdit = faPen; faPlus = faPlus; faTrash = faTrashAlt; faCalendar = faCalendarAlt;
  raidTimeDisplays: RaidTimeDisplay[] = [];
  constructor(private wlService: ConfigurationService) { }

  ngOnInit(): void {
    // Build timer configs for any raid times that align with those 7 days
    this.wlService.getUsersStatics().subscribe(statics => {
      this.generateRaidTimeDisplays(statics);
    });
  }
  generateRaidTimeDisplays(raidGroups: RaidGroup[]) {
    // Get next 7 dates from today
    const end = addDays(Date.now(), 7);
    const nextSevenDays = eachDayOfInterval({ start: new Date(), end });
    const raidTimesByDay = dayToRaidTimesMap(raidGroups);
    // Generate countdowns for the next 7 days
    for (const date of nextSevenDays) {
      const raidTimes = raidTimesByDay.get(date.getDay()) || [];
      console.log('map', date.getDay(), raidTimes, raidTimesByDay);
      for (const raidTime of raidTimes) {
        const timeParts = raidTime.startTime.split(':');
        // TODO ew, store numbers earlier instead
        date.setHours(parseInt(timeParts[0], 10), parseInt(timeParts[1], 10));
        const seconds = differenceInSeconds(date, Date.now());
        this.raidTimeDisplays.push({
          raidGroup: raidTime.raidGroup,
          countdownConfig: {
            leftTime: seconds
          }
        });
      }
    }
  }

}
