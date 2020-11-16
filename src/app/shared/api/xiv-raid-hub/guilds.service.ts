import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuildsService {
  constructor(private http: HttpClient) { }
  getGuilds(targetGuildId?: string) {
    let params = new HttpParams();
    if (targetGuildId) {
      params = params.append('targetGuildId', targetGuildId);
    }
    return this.http.get<{id: string, name: string, channels?: any[]}[]>('/guilds', {params});
  }
  getGuildChannels(guildId: string) {
    return this.http.get<{id: string, name: string}[]>('/guilds/' + guildId + '/channels');
  }
  getGuildRoles(guildId: string) {
    return this.http.get<{id: string, name: string}[]>('/guilds/' + guildId + '/roles');
  }
}
