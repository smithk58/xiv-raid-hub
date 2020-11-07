import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type PropertyValue = string | number | boolean;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  getSettings() {
    return this.http.get<Record<string, PropertyValue >>('/current-user/settings');
  }
  saveSettings(settingsToSave: Record<string, PropertyValue>) {
    return this.http.put<Record<string, PropertyValue>>('/current-user/settings', settingsToSave);
  }
}
