import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { BASE_API_URL } from 'src/app/api-injection-token';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

@Injectable({
  providedIn: 'root'
})
export class RaidGroupService {
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(BASE_API_URL) private baseAPIUrl: string, private http: HttpClient
  ) { }
  getRaidGroups() {
    return this.http.get<RaidGroup[]>('/raid-groups');
  }
  getRaidGroup(raidGroupId: number) {
    return this.http.get<RaidGroup>('/raid-groups/' + raidGroupId);
  }
  insertRaidGroup(raidGroup: RaidGroup) {
    return this.http.post<RaidGroup>('/raid-groups', raidGroup);
  }
  updateRaidGroup(raidGroup: RaidGroup) {
    return this.http.put<RaidGroup>('/raid-groups/' + raidGroup.id, raidGroup);
  }
  deleteRaidGroup(raidGroupId: number) {
    return this.http.delete('/raid-groups/' + raidGroupId);
  }
  getRaidTimes() {
    return this.http.get<WeeklyRaidTime[]>('/raidTimes');
  }
  getRaidGroupsRaidTimes(raidGroupId: number) {
    return this.http.get<WeeklyRaidTime[]>('/raid-groups/' + raidGroupId + '/raidTimes');
  }
  updateRaidGroupsRaidTimes(raidGroupId: number, weeklyRaidTimes: WeeklyRaidTime[]) {
    return this.http.put<WeeklyRaidTime[]>('/raid-groups/' + raidGroupId + '/raidTimes', weeklyRaidTimes);
  }
}
