import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs';

import { BASE_API_URL } from 'src/app/api-injection-token';
import { UserSession } from 'src/app/shared/api/xiv-raid-hub/models/user-session';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(@Inject(DOCUMENT) private document: Document, @Inject(BASE_API_URL) private baseAPIUrl: string, private http: HttpClient,
              private notify: PNotifyService
  ) { }
  private userSession$ = new ReplaySubject<UserSession>(1);
  /**
   * Redirect the user to discords authentication
   */
  login() {
    this.document.location.href = this.baseAPIUrl + 'connect/discord';
  }
  logout() {
    return this.http.get('/session/logout').pipe(tap(() => {
      this.refreshSession();
    }));
  }
  refreshSession() {
    // Not very "reactive", but rxjs shenanigans are a annoying me
    this.http.get<UserSession>('/session').subscribe(session => {
      this.userSession$.next(session);
    }, error => {
      this.notify.error({text: 'Failed to get a session. ' + error});
    });
  }
  getUserSession() {
    return this.userSession$;
  }
}
