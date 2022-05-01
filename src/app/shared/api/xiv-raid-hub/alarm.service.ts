import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AlarmDefinition } from 'src/app/shared/api/xiv-raid-hub/models/alarmDefinition';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private http: HttpClient) { }
  getAllAlarms() {
    return this.http.get<AlarmDefinition[]>('/alarms');
  }
  insertAlarm(alarm: AlarmDefinition) {
    return this.http.post<AlarmDefinition>('/alarms', alarm);
  }
  updateAlarm(alarm: AlarmDefinition) {
    return this.http.put<AlarmDefinition>('/alarms/' + alarm.id, alarm);
  }
  deleteAlarm(alarmId: number) {
    return this.http.delete('/alarms/' + alarmId);
  }
}
