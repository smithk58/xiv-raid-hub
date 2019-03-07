import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export const XIV_API_KEY = new InjectionToken<string>('XIV_API_KEY');
@Injectable({
  providedIn: 'root'
})
export class XivapiService2 {
  // This service only exists because the provided xivapi service didn't have all of their API endpoints. Remove any from here that become
  // available from the official APIs service
  API_BASE_URL = 'https://xivapi.com';
  constructor(private http: HttpClient, @Inject(XIV_API_KEY) private xivApiKey: string) { }
  getServerListByDC() {
    const config = {
      params: {
        key: this.xivApiKey
      }
    };
    return this.http.get(this.API_BASE_URL + '/servers/dc', config);
  }
}
