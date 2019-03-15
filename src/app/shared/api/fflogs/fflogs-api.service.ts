import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';

import {ClassWrapper} from './models/Class';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {RankingPagesWrapper} from './models/Ranking';
import {Zone} from './models/Zone';
import {Parse} from 'src/app/shared/api/fflogs/models/Parse';
import {Character} from 'src/app/shared/api/models/character';
import {XivApiService2} from 'src/app/shared/api/xivapi/xiv-api-2.service';
import {DCToRegion} from 'src/app/shared/Utils';

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
    const config = {
      params: {
        api_key : this.apiKey
      }
    };
    return this.http.get<ClassWrapper[]>(this.apiURL + 'classes', config).pipe(
      map(wrapper => {
        // We want to return the list of specs off the class wrapper, since the concept of a "Global" class is useless to us.
        // We also don't care about their class IDs, so we'll grab name off of it
        if (wrapper.length > 0) {
          return wrapper[0].specs.map(c => c.name).sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));
        } else {
          return [];
        }
      }),
      catchError(error => {
        this.notify.error({text: 'Unable to get classes ' + error});
        return throwError(error);
      })
    );
  }

  /**
   * Returns all of the available zones for parsing in FFlogs
   */
  getZones() {
    const config = {
      params: {
        api_key : this.apiKey,
      } as any
    };
    return this.http.get<Zone[]>(this.apiURL + 'zones', config).pipe(
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
    const config = {
      params: {
        api_key : this.apiKey,
      } as any
    };
    return this.http.get<Zone[]>(this.apiURL + 'report/fights/' + reportId, config);
  }
  getEncounterRankings(encounterId: number, pageNumber?: number) {
    const config = {
      params: {
        api_key : this.apiKey,
      } as any
    };
    if (typeof(pageNumber) !== 'undefined') {
      config.params.page = pageNumber;
    }
    return this.http.get<RankingPagesWrapper>(this.apiURL + 'rankings/encounter/' + encounterId, config);
  }
  /**
   * Returns the available parses for the specified character.
   * @param characterName - The name of the character to get parses for.
   * @param serverName - The server the specified character belongs to.
   * @param serverRegion - The region the specified server belongs to.
   * @param zoneId - The zone ID to get reports for.
   * @param encounterId - The encounter id to get reports for.
   */
  getCharacterParses(characterName: string, serverName: string, serverRegion: string, zoneId: number, encounterId: number) {
    const config = {
      params: {
        api_key : this.apiKey,
        zone: zoneId,
        encounter: encounterId
      } as any
    };
    return this.http.get<Parse[]>(this.apiURL + 'parses/character/' + characterName + '/' + serverName + '/' + serverRegion, config);
  }

  /**
   * Opens fflogs page for the specified character.
   * @param character - The character to open the page .
   */
  openFFlogsForCharacter(character: Character) {
    this.xivApi2.getServerToDCMap().subscribe(serverToDC => {
      const dc = serverToDC[character.server];
      const region = DCToRegion[dc];
      const profileURL = this.baseURL + '/character/' + region + '/' + character.server + '/' + character.name;
      window.open(profileURL, '_blank');
    });
  }
}
