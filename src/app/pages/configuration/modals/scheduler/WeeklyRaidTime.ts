import { Day, DaysOfWeek, DaysOfWeekByJsDay } from 'src/app/shared/DaysUtils';

export interface WeeklyRaidTime {
  id?: number;
  raidGroupId: number;
  utcWeekMask: number;
  utcHour: number;
  utcMinute: number;
  utcTimezoneOffset: number;
  localTime?: Date; /*Has to manually be set by FE*/
}
export interface RaidTime {
  raidGroupId: number;
  startTime: Date;
}

/**
 * Calculates the days in week mask via an array of booleans, where true implies it's included in the mask.
 * @param values - An array of booleans that representing which days should be included in the mask, where the first boolean is Monday.
 */
export function calculateDaysInWeekMask(values: boolean[]): number {
  let mask = 0;
  for (let i = 0; i < values.length; i++) {
    const include = values[i];
    if (include) {
       mask += DaysOfWeek.get(i).bit;
    }
  }
  return mask;
}

/**
 * Creates an array of booleans representing whether the days in DaysInWeek are included in the passed in mask, according to the mask
 * values of DaysOfWeek.
 * @param mask -
 */
export function daysInWeekMaskToBools(mask: number): boolean[] {
  const bools = [];
  for (const day of DaysOfWeek.values()) {
    // eslint-disable-next-line no-bitwise
    bools.push(mask & day.bit ? true : false);
  }
  return bools;
}

/**
 * Returns a map of js day(i.e. 0 = sun) to raid times.
 * @param weeklyRaidTimes - The list of weekly raid times to use weekMask/times from.
 */
export function dayToRaidTimesMap(weeklyRaidTimes: WeeklyRaidTime[]): Map<number, RaidTime[]> {
  const dayToTimes = new Map<number, RaidTime[]>();
  for (const weeklyRaidTime of weeklyRaidTimes) {
    for (const day of DaysOfWeek.values()) {
      // eslint-disable-next-line no-bitwise
      if (weeklyRaidTime.utcWeekMask & day.bit) {
        const startTime = new Date();
        startTime.setUTCHours(weeklyRaidTime.utcHour, weeklyRaidTime.utcMinute, 0);
        // Have to potentially transform the day to equivalent local day, since the mask is UTC days
        const localDay = raidDayToLocalDay(startTime, day);
        if (!dayToTimes.has(localDay.jsDay)) {
          dayToTimes.set(localDay.jsDay, [{raidGroupId: weeklyRaidTime.raidGroupId, startTime}]);
        } else {
          dayToTimes.get(localDay.jsDay).push({raidGroupId: weeklyRaidTime.raidGroupId, startTime});
        }
      }
    }
  }
  return dayToTimes;
}

/**
 * Returns a local day for the specified raid day/time.
 * @param raidTime - A date set to a raid time. Only the time is relevant, because it will be used to determine if the local date is different than the UTC date.
 * @param utcDay - The UTC day that the raid time will take place on.
 */
export function raidDayToLocalDay(raidTime: Date, utcDay: Day) {
  if (raidTime.getDay() === raidTime.getUTCDay()) { // utc day matches local day, so just return it
    return utcDay;
  }
  // Positive timezone offset means local time is earlier than UTC (i.e. local + offset = utc)
  const localTimeIsEarlier = raidTime.getTimezoneOffset() > 0;
  let targetJsDay = localTimeIsEarlier ? utcDay.jsDay - 1 : utcDay.jsDay + 1;
  if (targetJsDay < 0) { // handle wrapping 0 -> 6, and 6 -> 0
    targetJsDay = DaysOfWeekByJsDay.size - 1;
  } else if (targetJsDay === DaysOfWeekByJsDay.size) {
    targetJsDay = 0;
  }
  return DaysOfWeekByJsDay.get(targetJsDay);
}
