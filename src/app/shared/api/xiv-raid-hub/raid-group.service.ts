import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { BASE_API_URL } from 'src/app/api-injection-token';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';

@Injectable({
  providedIn: 'root'
})
export class RaidGroupService {
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(BASE_API_URL) private baseAPIUrl: string, private http: HttpClient,
              private notify: PNotifyService
  ) { }
  getRaidGroups() {
    return this.http.get<RaidGroup[]>('/raid-groups');
  }
  getRaidGroup(raidGroupId: number) {
    return this.http.get<RaidGroup>('/raid-groups/' + raidGroupId);
  }
  insertRaidGroup(raidGroup: RaidGroup) {
    // tslint:disable-next-line:max-line-length
    raidGroup = JSON.parse('{"share":false,"name":"Wipe Squad","purpose":"UCOB","characters":[{"defaultClass":"Astrologian", "order": 1,"character":{"id":15888379,"name":"Ruze Nitsah","server":"Lamia (Primal)"}},{"defaultClass":"Astrologian", "order": 2,"character":{"id":17510862,"name":"Reika Nitsah","server":"Lamia (Primal)"}},{"defaultClass":"Astrologian", "order": 3,"character":{"id":16568560,"name":"Pocket Sans","server":"Lamia (Primal)"}},{"defaultClass":"Astrologian", "order": 4,"character":{"id":5016395,"name":"Abrem Sev","server":"Leviathan (Primal)"}},{"defaultClass":"Astrologian", "order": 5,"character":{"id":18389904,"name":"Lilith Ludenberck","server":"Lamia (Primal)"}},{"defaultClass":"Astrologian", "order": 6,"character":{"id":25609832,"name":"Jisoo Choi","server":"Lamia (Primal)"}},{"defaultClass":"Astrologian", "order": 7,"character":{"id":17149227,"name":"Wally Kokorajii","server":"Lamia (Primal)"}},{"defaultClass":"Astrologian", "order": 8,"character":{"id":17690419,"name":"Shin Park","server":"Lamia (Primal)"}}]}');
    return this.http.post<RaidGroup>('/raid-groups', raidGroup);
  }
  updateRaidGroup(raidGroup: RaidGroup) {
    return this.http.put<RaidGroup>('/raid-groups/' + raidGroup.id, raidGroup);
  }
  deleteRaidGroup(raidGroupId: number) {
    return this.http.delete('/raid-groups/' + raidGroupId);
  }
}
