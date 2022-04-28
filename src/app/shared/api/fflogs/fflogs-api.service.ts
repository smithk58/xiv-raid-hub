import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Class } from './models/Class';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { RankingPagesWrapper } from './models/Ranking';
import { Zone } from './models/Zone';
import { Parse } from 'src/app/shared/api/fflogs/models/Parse';
import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { XivApiService2 } from 'src/app/shared/api/xivapi/xiv-api-2.service';
import { DCToRegion } from 'src/app/shared/Utils';
import { Server } from 'src/app/shared/api/fflogs/models/Server';
import { Region } from 'src/app/shared/api/fflogs/models/Region';

@Injectable({
  providedIn: 'root'
})
export class FFLogsApiService {
  baseURL = 'https://www.fflogs.com';
  apiURL = this.baseURL + '/v1/';
  apiKey = '8c71f14062c29d33ac7f247580b1c903';
  constructor(private http: HttpClient, private notify: PNotifyService, private xivApi2: XivApiService2) { }
  /**
   * Returns a list of the available classes in FF14.
   */
  getClasses() {
    return this.http.get<Class[]>('/fflogs/classes').pipe(
      map((classes) => {
        return classes.map((ffClass) => ffClass.name);
      })
    );
  }
  getRegions() {
    return this.http.get<Region[]>('/fflogs/regions');
  }
  getServers() {
    return this.http.get<Server[]>('/fflogs/servers');
  }
  /**
   * Returns all of the available zones for parsing in FFlogs
   */
  getZones() {
    const params = this.getDefaultParams();
    return this.http.get<Zone[]>(this.apiURL + 'zones', {params}).pipe(
      map(zones => {
        // Sort alpha
        return zones.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      })
    );
  }
  /**
   * Returns ff logs report for the specified report id.
   * @param reportId - The report id to get.
   */
  getReport(reportId: string) {
    const params = this.getDefaultParams();
    return this.http.get<Zone[]>(this.apiURL + 'report/fights/' + reportId, {params});
  }
  getEncounterRankings(encounterId: number, pageNumber?: number) {
    let params = this.getDefaultParams();
    if (typeof(pageNumber) !== 'undefined') {
      params = params.append('page', pageNumber.toString());
    }
    return this.http.get<RankingPagesWrapper>(this.apiURL + 'rankings/encounter/' + encounterId, {params});
  }
  getCharacterRankings(characterName: string, serverName: string, serverRegion: string, pageNumber?: number) {
    let params = this.getDefaultParams();
    if (typeof(pageNumber) !== 'undefined') {
      params = params.append('page', pageNumber.toString());
    }
    return this.http.get<RankingPagesWrapper>(`${this.apiURL}rankings/character/${characterName}/${serverName}/${serverRegion}`, {params});
  }
  /**
   * Returns the available parses for the specified character.
   * @param characterName - The name of the character to get parses for.
   * @param serverName - The server the specified character belongs to.
   * @param serverRegion - The region the specified server belongs to.
   * @param zoneId - The zone ID to get reports for.
   * @param encounterId - The encounter id to get reports for.
   * @param partition - The partition position (NOT INDEX) of the zone to get parses for.
   */
  getCharacterParses(characterName: string, serverName: string, serverRegion: string, zoneId: number, encounterId: number,
                     partition?: number
  ) {
    let params = this.getDefaultParams();
    if (typeof(zoneId) !== 'undefined') {
      params = params.append('zone', zoneId.toString());
    }
    if (typeof(encounterId) !== 'undefined') {
      params = params.append('encounter', encounterId.toString());
    }
    if (typeof(encounterId) !== 'undefined') {
      params = params.append('encounter', encounterId.toString());
    }
    if (typeof(partition) !== 'undefined') {
      params = params.append('partition', partition.toString());
    }
    return this.http.get<Parse[]>(this.apiURL + 'parses/character/' + characterName + '/' + serverName + '/' + serverRegion, {params});
  }

  /**
   * Opens the FFlogs page for the specified report and fight number.
   * @param reportId - The report to open.
   * @param fightNumber - The fight number in the report to open.
   */
  openFFlogsReport(reportId: string, fightNumber?: number) {
    let reportUrl = this.baseURL + '/reports/' + reportId;
    if (typeof(fightNumber) !== 'undefined') {
      reportUrl += '#fight=' + fightNumber;
    }
    window.open(reportUrl, '_blank');
  }
  /**
   * Opens fflogs page for the specified character.
   * @param character - The character to open the page .
   */
  openFFlogsForCharacter(character: Character) {
    this.xivApi2.getServerToDCMap().subscribe(serverToDC => {
      const serverName = this.xivApi2.parseServerName(character.server);
      const dc = serverToDC[serverName];
      const region = DCToRegion[dc];
      const profileURL = this.baseURL + '/character/' + region + '/' + serverName + '/' + character.name;
      window.open(profileURL, '_blank');
    });
  }
  private getDefaultParams() {
    const config = new HttpParams();
    return config.append('api_key', this.apiKey);
  }
}
