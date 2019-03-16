import { Injectable } from '@angular/core';

import {concatMap} from 'rxjs/operators';

import {XivApiService2} from 'src/app/shared/api/xivapi/xiv-api-2.service';
import {Character} from 'src/app/shared/api/models/character';
import {FFLogsApiService} from 'src/app/shared/api/fflogs/fflogs-api.service';
import {DCToRegion, ExpansionToBracketMin, ExpansionToDefaultZone, Utils} from 'src/app/shared/Utils';
import {Zone} from 'src/app/shared/api/fflogs/models/Zone';

@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {
  constructor(private xivApi2: XivApiService2, private fflogsApi: FFLogsApiService) { }

  /**
   * Returns the available reports for the specified character.
   * @param character - The character to get reports for.
   * @param zoneId - The zone ID to get reports for.
   * @param encounterId - The encounter id to get reports for.
   */
  getCharacterReports(character: Character, zoneId: number, encounterId?: number) {
    return this.xivApi2.getServerToDCMap().pipe(
      concatMap( serverToDC => {
        const dc = serverToDC[character.server];
        const region = DCToRegion[dc];
        return this.fflogsApi.getCharacterParses(character.name, character.server, region, zoneId, encounterId);
      })
    );
  }

  /**
   * Returns a list of expansion that have raids.
   */
  getRaidableExpansions() {
    return Utils.enumToArray(ExpansionToBracketMin).reverse();
  }
  /**
   * Gets the default zone ID for the specified expansion.
   * @param expansion - The expansion to get the default zone of.
   * @param zones - The list of available zones
   */
  getDefaultZoneForExpansion(expansion: string, zones: Zone[]) {
    const defaultZoneId = ExpansionToDefaultZone[expansion];
    let zone = null;
    if (defaultZoneId) {
      zone = zones.find(fZone => fZone.id === defaultZoneId);
    }
    return zone;
  }

  /**
   * Opens XIV analysis page for the specified report, fight, and character.
   * @param reportId - An FF logs report ID to analyze.
   * @param fightNumber - A particular fight number from the report to analyze.
   */
  openXIVAnalysis(reportId: string, fightNumber: number) {
    const profileURL = 'https://xivanalysis.com/find/' + reportId + '/' + fightNumber;
    window.open(profileURL, '_blank');
  }
}
