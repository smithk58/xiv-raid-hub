import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';

import { BASE_API_URL } from 'src/app/api-injection-token';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';
import { Alarm } from 'src/app/shared/api/xiv-raid-hub/models/alarm';

@Injectable({
  providedIn: 'root'
})
export class RaidGroupService {
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(BASE_API_URL) private baseAPIUrl: string, private http: HttpClient
  ) { }
  getRaidGroups(userIdForOwnerCalculation?: number) {
    return this.http.get<RaidGroup[]>('/raid-groups').pipe(
      tap(raidGroups => { // TODO kill this dumb stuff when typeorm addSelectAndMap releases in 0.3.0
        raidGroups.forEach((raidGroup) => raidGroup.isOwner = raidGroup.ownerId === userIdForOwnerCalculation);
      })
    );
  }
  getRaidGroup(raidGroupId: number, userIdForOwnerCalculation?: number) {
    return this.http.get<RaidGroup>('/raid-groups/' + raidGroupId);
  }
  insertRaidGroup(raidGroup: RaidGroup) {
    return this.http.post<RaidGroup>('/raid-groups', raidGroup);
  }
  updateRaidGroup(raidGroup: RaidGroup) {
    return this.http.put<RaidGroup>('/raid-groups/' + raidGroup.id, raidGroup);
  }
  copyRaidGroup(raidGroupId: number) {
    return this.http.post<RaidGroup>('/raid-groups/' + raidGroupId, {});
  }
  deleteRaidGroup(raidGroupId: number) {
    return this.http.delete('/raid-groups/' + raidGroupId);
  }
  getRaidTimes() {
    return this.http.get<WeeklyRaidTime[]>('/raid-times').pipe(
      map(raidTimes => {
        const currentDay = new Date().getDate();
        // Generate the local time via the utc hours/minutes
        raidTimes.forEach(raidTime => {
          const startTime = new Date();
          startTime.setUTCHours(raidTime.utcHour);
          startTime.setUTCMinutes(raidTime.utcMinute);
          startTime.setUTCSeconds(0);
          // Reset the day back to the current day, since setting UTC times can roll over to next/previous day
          startTime.setDate(currentDay);
          raidTime.localTime = startTime;
        });
        // Sort the raid times
        return raidTimes.sort((rt1, rt2) => {
          return rt1.localTime.getTime() - rt2.localTime.getTime();
        });
      })
    );
  }
  getRaidGroupsRaidTimes(raidGroupId: number) {
    return this.http.get<WeeklyRaidTime[]>('/raid-groups/' + raidGroupId + '/raid-times');
  }
  updateRaidGroupsRaidTimes(raidGroupId: number, weeklyRaidTimes: WeeklyRaidTime[]) {
    return this.http.put<WeeklyRaidTime[]>('/raid-groups/' + raidGroupId + '/raid-times', weeklyRaidTimes);
  }
}
