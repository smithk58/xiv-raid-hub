import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserSession } from 'src/app/shared/api/xiv-raid-hub/models/user-session';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { AppConfigService } from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(@Inject(DOCUMENT) private document: Document, private appConfig: AppConfigService, private http: HttpClient,
              private notify: PNotifyService, private router: Router
  ) { }
  private userSession$ = new ReplaySubject<UserSession>(1);
  /**
   * Redirect the user to discords authentication
   */
  login() {
    this.document.location.href = this.appConfig.baseAPIURL + '/connect/discord';
  }
  logout() {
    return this.http.get('/session/logout').pipe(tap(() => {
      this.refreshSession();
      this.router.navigate(['/home']);
    }));
  }
  refreshSession() {
    const timezone = this.getTimezone();
    const config = {
      params: {
        timezone
      }
    };
    // Not very "reactive", but rxjs shenanigans are a annoying me
    this.http.get<UserSession>('/session', config).pipe(
      tap((session) => {
        // Default the timezone if the server failed to parse it to shorthand for whatever reason
        if (!session.prettyTimezone) {
          session.prettyTimezone = this.getTimezone();
        }
      })
    ).subscribe(session => {
      this.userSession$.next(session);
    }, error => {
      this.notify.error({text: 'Failed to get a session. ' + error});
    });
  }
  getUserSession() {
    return this.userSession$;
  }
  private getTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
}
