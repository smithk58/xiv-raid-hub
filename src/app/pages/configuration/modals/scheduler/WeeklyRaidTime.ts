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
 * @param raidTime - A date set to a raid time.
 * @param utcDay - The UTC day that the raid time will take place on.
 */
export function raidDayToLocalDay(raidTime: Date, utcDay: Day) {
  const dayDiff = raidTime.getDay() - raidTime.getUTCDay();
  if (dayDiff === 0) { // utc day matches local day, so just return it
    return utcDay;
  }
  // return the local day via subtracting the different between the day and utc day
  let tDayIndex = utcDay.jsDay + dayDiff;
  if (tDayIndex < 0) {
    tDayIndex = DaysOfWeekByJsDay.size - 1;
  } else if (tDayIndex === DaysOfWeekByJsDay.size) {
    tDayIndex = 0;
  }
  return DaysOfWeekByJsDay.get(tDayIndex);
}
