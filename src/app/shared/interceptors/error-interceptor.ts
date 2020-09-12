import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Catch any errors and simplify them
    return next.handle(request).pipe(
      catchError(err => this.handleError(err, request, next))
    );
  }

  /**
   * Simplifies error responses to a simple string for service calls to handle easier.
   * @param response - The HttpErrorResponse object from angular/common/http.
   * @param request - The http request that had the error.
   * @param next - The http handler to continue the request.
   */
  handleError(response: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let simplifiedError;
    if (response instanceof HttpErrorResponse) {
      if (typeof(response.error) === 'string') {
        simplifiedError = response.error;
      } else if (typeof(response.error.message) === 'string') {
        simplifiedError = response.error.message;
      } else if (typeof(response.statusText) === 'string') {
        simplifiedError = response.statusText;
      } else if (typeof(response.message) === 'string') {
        simplifiedError = response.message;
      }
      simplifiedError = !simplifiedError ? 'Unknown error.' : simplifiedError;
    }
    return throwError(simplifiedError);
  }
}
