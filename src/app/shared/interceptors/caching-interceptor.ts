import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RequestCacheService } from 'src/app/shared/api/caching/request-cache.service';
import { BASE_API_URL } from 'src/app/api-injection-token';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService, @Inject(BASE_API_URL) private baseAPIUrl: string) {}
  // TODO We only want to cache a subset of get requests, but this works for now. Need an annotation on requests or something
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cachedResponse = this.cache.get(req);
    // Have to build HttpResponse, in case it this cached item came from localStorage
    return cachedResponse ? of(new HttpResponse(cachedResponse)) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        // Cache any http responses that don't come from our api
        if (event instanceof HttpResponse && !req.url.startsWith(this.baseAPIUrl)) {
          cache.put(req, event);
        }
      })
    );
  }
}
