import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from 'src/app/shared/interceptors/error-interceptor';
import { CachingInterceptor } from 'src/app/shared/interceptors/caching-interceptor';
import { ApiUrlInterceptor } from 'src/app/shared/interceptors/api-url-interceptor';

/** Http interceptor providers in outside-in order */

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
];
