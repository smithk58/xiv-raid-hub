import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

import {ClassWrapper} from './models/Class';
import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {RankingPagesWrapper} from './models/Ranking';
import {Zone} from './models/Zone';

@Injectable({
  providedIn: 'root'
})
export class FFLogsApiService {
  baseUrl = 'https://www.fflogs.com/v1/';
  apiKey = '8c71f14062c29d33ac7f247580b1c903';
  constructor(private http: HttpClient, private notify: PNotifyService) { }

  /**
   * Returns a list of the available classes in FF14.
   */
  getClasses() {
    const config = {
      params: {
        api_key : this.apiKey
      }
    };
    return this.http.get<ClassWrapper[]>(this.baseUrl + 'classes', config).pipe(
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
  getReport(reportId: string) {
    const config = {
      params: {
        api_key : this.apiKey,
      } as any
    };
    return this.http.get<Zone[]>(this.baseUrl + 'report/fights/' + reportId, config);
  }
  getZones() {
    const config = {
      params: {
        api_key : this.apiKey,
      } as any
    };
    return this.http.get<Zone[]>(this.baseUrl + 'zones', config);
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
    return this.http.get<RankingPagesWrapper>(this.baseUrl + 'rankings/encounter/' + encounterId, config);
  }
  getCharacterRankings() {

  }
}
