import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, map} from 'rxjs/operators';

import {ClassWrapper} from './models/Class';
import {PNotifyService} from '../notifications/pnotify-service.service';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FFLogsApiService {
  baseUrl = 'https://www.fflogs.com/v1/';
  apiKey = '8c71f14062c29d33ac7f247580b1c903';
  constructor(private http: HttpClient, private notify: PNotifyService) { }
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
          return wrapper[0].specs.map(c => c.name).sort((a, b) => (a > b) ? 1 : ((b > a) ? -1 : 0));;
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
}
