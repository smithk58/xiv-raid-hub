import { Injectable, Inject, InjectionToken } from '@angular/core';
import {HttpEvent, HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';
import {BASE_API_URL} from 'src/app/api-injection-token';

export const API_URL = new InjectionToken<string>('apiUrl');

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_API_URL) private baseAPIUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({url: this.prepareUrl(req.url)});
    return next.handle(req);
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.baseAPIUrl + url;
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
