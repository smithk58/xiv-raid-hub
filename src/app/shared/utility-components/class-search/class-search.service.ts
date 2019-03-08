import { Injectable } from '@angular/core';

import {FFLogsApiService} from '../../api/fflogs/fflogs-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassSearchService {

  constructor(private ffLogApi: FFLogsApiService) { }
  getClasses() {
    return this.ffLogApi.getClasses();
  }
}
