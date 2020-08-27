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
   * @param error - The HttpErrorResponse object from angular/common/http.
   * @param request - The http request that had the error.
   * @param next - The http handler to continue the request.
   */
  handleError(error: any, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let simplifiedError;
    // Simplify the handling of the user vs developer message (user message has precedence)
    if (error instanceof HttpErrorResponse && error.error) {
      const httpError = error.error;
      if (httpError.error) {
        simplifiedError = httpError.error;
      }
    }
    return simplifiedError ? throwError(simplifiedError) : throwError(error);
  }
}
