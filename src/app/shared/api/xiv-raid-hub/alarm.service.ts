import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Alarm } from 'src/app/shared/api/xiv-raid-hub/models/alarm';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  constructor(private http: HttpClient) { }
  getAllAlarms() {
    return this.http.get<Alarm[]>('/alarms');
  }
  insertAlarm(alarm: Alarm) {
    return this.http.post<Alarm>('/alarms', alarm);
  }
  updateAlarm(alarm: Alarm) {
    return this.http.put<Alarm>('/alarms/' + alarm.id, alarm);
  }
  deleteAlarm(alarmId: number) {
    return this.http.delete('/alarms/' + alarmId);
  }
}
