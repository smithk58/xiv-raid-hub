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
   */
  getCharacterReports(character: Character) {
    return this.xivApi2.getServerToDCMap().pipe(
      concatMap( serverToDC => {
        const dc = serverToDC[character.server];
        const region = DCToRegion[dc];
        return this.fflogsApi.getCharacterParses(character.name, character.server, region);
      })
    );
  }
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
}
