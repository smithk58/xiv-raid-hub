import { Injectable } from '@angular/core';
import { daysInWeekMaskToBools, WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  constructor() { }

  /**
   * Returns the local time/week mask for the provided weekly raid time, which is in UTC.
   * @param raidTime -
   */
  weeklyRaidTimeToLocal(raidTime: WeeklyRaidTime) {
    let localTime, localDaysInWeek;
    // Convert the time to the users local hours/minutes
    const time = new Date();
    time.setUTCHours(raidTime.utcHour, raidTime.utcMinute, 0);
    localTime = {hour: time.getHours(), minute: time.getMinutes(), second: 0};
    // Convert the selected days from UTC to local users days
    const utcDaysInWeek = daysInWeekMaskToBools(raidTime.utcWeekMask);
    const shiftDir = this.getDayShiftDirection(time, 'local');
    if (shiftDir) {
      localDaysInWeek = this.shiftDayBooleanArray(utcDaysInWeek, shiftDir);
    } else {
      localDaysInWeek = utcDaysInWeek; // no shifting needed, the days already match up to the local users
    }
    return {localTime, localDaysInWeek};
  }
  /**
   * Calculates whether you need to shift the days left or right in the days boolean array, depending on if you want the array to be the
   * users local days or UTC days.
   * @param date - A day representing a particular raid time (the date doesn't matter, only the time).
   * @param target - Whether you want to shift the days to local days or UTC.
   */
  getDayShiftDirection(date: Date, target: 'local' | 'utc') {
    if (date.getDay() === date.getUTCDay()) { // utc day matches local day, so no shifting necessary
      return undefined;
    }
    // Positive timezone offset means local time is earlier than UTC (i.e. local + offset = utc)
    const localTimeIsEarlier = date.getTimezoneOffset() > 0;
    if (target === 'utc') {
      // if local time is earlier, then UTC day must be equal to or greater than it, so we want to shift right
      // i.e. if local day is monday, utc must be monday or tuesday if local time is earlier
      return localTimeIsEarlier ? 'right' : 'left';
    }
    return localTimeIsEarlier ? 'left' : 'right';
  }
  /**
   * Shifts the trues in the boolean array left or right to handle local day -> UTC day or vice versa.
   * @param values - An array of booleans.
   * @param shiftDirection - true values will be shifted left/right based on this.
   */
  shiftDayBooleanArray(values: boolean[], shiftDirection: 'left' | 'right') {
    const nValues = [];
    for (let i = 0; i < values.length; i++) {
      let tIdx = shiftDirection === 'left' ? (i - 1) : (i + 1);
      // wrap the index if it under/overflows the array bounds
      if (tIdx < 0) {
        tIdx = values.length - 1;
      } else if (tIdx === values.length) {
        tIdx = 0;
      }
      nValues[tIdx] = values[i];
    }
    return nValues;
  }
}
