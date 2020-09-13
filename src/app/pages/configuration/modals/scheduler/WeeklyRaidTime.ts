import parseISO from 'date-fns/parseISO';
import { DaysOfWeek } from 'src/app/shared/DaysUtils';

export interface WeeklyRaidTime {
  id?: number;
  raidGroupId: number;
  weekMask: number;
  startTime: string; /*technically a date, but should only use the time off of it*/
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
    // tslint:disable-next-line:no-bitwise - I do what I want >:(
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
      // tslint:disable-next-line:no-bitwise - I do what I want >:(
      if (weeklyRaidTime.weekMask & day.bit) {
        const startTime = parseISO(weeklyRaidTime.startTime);
        if (!dayToTimes.has(day.jsDay)) {
          dayToTimes.set(day.jsDay, [{raidGroupId: weeklyRaidTime.raidGroupId, startTime}]);
        } else {
          dayToTimes.get(day.jsDay).push({raidGroupId: weeklyRaidTime.raidGroupId, startTime});
        }
      }
    }
  }
  return dayToTimes;
}
