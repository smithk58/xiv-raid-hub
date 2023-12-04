import { Injectable } from '@angular/core';

import { XivapiService } from '@xivapi/angular-client';
import { catchError } from 'rxjs/operators';

import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterSearchService {

  constructor(private xivAPI: XivapiService, private notifyService: PNotifyService) { }
  searchCharacter(searchTerm: string, server?: string, page?: number) {
    return this.xivAPI.searchCharacter(searchTerm, server, page).pipe(
      catchError((err) => {
        const text = err.Message ? err.Message : 'There\'s an unknown error with the character search API. Please try again later.' ;
        this.notifyService.error({text});
        return err;
      })
    );
  }
}
