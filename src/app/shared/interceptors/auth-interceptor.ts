import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from 'src/app/shared/api/xiv-raid-hub/user.service';
import { PNotifyService } from 'src/app/shared/notifications/pnotify-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private notify: PNotifyService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Catch any errors and simplify them
    return next.handle(request).pipe(
      catchError(err => this.handleAuthenticationError(err, request, next))
    );
  }

  /**
   * Checks an http error for a 401 on internal http calls and kills the front end session if found.
   * @param response -
   * @param request -
   * @param next -
   */
  handleAuthenticationError(response: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (response.status === 401) {
      this.notify.error({text: 'Your session expired, please log in again.'});
      this.userService.refreshSession();
      this.router.navigate(['/home']);
    }
    return throwError(response);
  }
}
