import { Injectable } from '@angular/core';

import {XivapiService} from '@xivapi/angular-client';
import {catchError} from 'rxjs/operators';

import {PNotifyService} from 'src/app/shared/notifications/pnotify-service.service';
import {XivapiService2} from 'src/app/shared/api/xivapi/xiv-api-service2.service';


@Injectable({
  providedIn: 'root'
})
export class CharacterSearchService {

  constructor(private xivAPI: XivapiService, private xivAPI2: XivapiService2, private notifyService: PNotifyService) { }
  searchCharacter(searchTerm: string, server?: string, page?: number) {
    return this.xivAPI.searchCharacter(searchTerm, server, page).pipe(
      catchError(err => this.notifyService.error({text: err.Message}))
    );
  }
}
