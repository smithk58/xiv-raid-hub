import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private baseApiUrl = environment.baseHref;
  constructor() { }
  init() {
    // in dev mode we just use the environment variable
    if (!environment.production) {
      return;
    }
    // in prod we reach out to our prod server to get the base API from the env variables
    return new Promise<void>((resolve, reject) => {
      // we use XMLHttpRequest because we have interceptors that depend on AppConfigService, which makes HttpClient unusable
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/config');
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const config = JSON.parse(xhr.responseText);
          this.baseApiUrl = config.baseApiUrl || '';
          if (!config.baseApiUrl) {
            console.error('The API url wasn\'t provided to the server.');
          }
          resolve();
        } else if (xhr.readyState === XMLHttpRequest.DONE) {
          reject('Failed to get application configuration.');
        }
      });
      xhr.send(null);
    });
  }
  public get baseAPIURL() {
    return this.baseApiUrl;
  }
}
