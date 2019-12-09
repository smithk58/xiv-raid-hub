import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

export const XIV_API_KEY = new InjectionToken<string>('XIV_API_KEY');
@Injectable({
  providedIn: 'root'
})
export class XivApiService2 {
  serverToDC: Record<string, string>;
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

  /**
   * Returns a server to DC map.
   */
  getServerToDCMap() {
    return this.serverToDC ? of(this.serverToDC) : this.getServerListByDC().pipe(
      map(dcToServer => {
        const serverToDC = {};
        for (const dc of Object.keys(dcToServer)) {
          for (const server of dcToServer[dc]) {
            serverToDC[server] = dc;
          }
        }
        this.serverToDC = serverToDC;
        return serverToDC;
      })
    );
  }
  parseServerName(server: string) {
    // Parses server name from the server/dc combination provided by xiv api
    const nbs = String.fromCharCode(160);
    return server.substring(0, server.indexOf(nbs));
  }
}
