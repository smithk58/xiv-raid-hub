import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';

export interface WeeklyRaidTime {
  weekMask: number;
  startTime: string; /*ISO time string*/
}
export interface RaidTime {
  raidGroup: RaidGroup;
  startTime: string; /*ISO time string*/
}
/**
 * Maps a day of the week string to our bit mask for WeeklyRaidTime.weekMask.
 */
export enum DaysInWeekBit {
  Mon = 1,
  Tue = 2,
  Wed = 4,
  Thu = 8,
  Fri = 16,
  Sat = 32,
  Sun = 64
}

/**
 * Maps a day of the week string to the number equivalent in JS.
 */
export enum DayToDayNumber {
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun
}
export const DaysInWeek = Object.keys(DaysInWeekBit).filter(x => isNaN(Number(x)));

/**
 * Calculates the days in week mask via an array of booleans, where true implies it's included in the mask.
 * @param values - An array of booleans that representing which days should be included in the mask.
 */
export function calculateDaysInWeekMask(values: boolean[]): number {
  let mask = 0;
  for (let i = 0; i < values.length; i++) {
    const include = values[i];
    if (include) {
      const day = DaysInWeek[i];
      mask += DaysInWeekBit[day];
    }
  }
  return mask;
}

/**
 * Creates an array of booleans representing whether the days in DaysInWeek are included in the passed in mask, according to the mask
 * values of DaysInWeekBit.
 * @param mask -
 */
export function daysInWeekMaskToBools(mask: number): boolean[] {
  const bools = [];
  for (const day of DaysInWeek) {
    // tslint:disable-next-line:no-bitwise - I do what I want >:(
    bools.push(mask & DaysInWeekBit[day] ? true : false);
  }
  return bools;
}

/**
 * Returns a map of day numbers(DayToDayNumber) to RaidTime's.
 * @param raidTimes - The list of raid times to use weekMask/ISO times from.
 */
export function dayToRaidTimesMap(raidGroups: RaidGroup[]) {
  const dayToTimes = new Map<number, RaidTime[]>();
  for (const raidGroup of raidGroups) {
    for (const weeklyRaidTime of raidGroup.weeklyRaidTimes) {
      for (const day of DaysInWeek) {
        // tslint:disable-next-line:no-bitwise - I do what I want >:(
        if (weeklyRaidTime.weekMask & DaysInWeekBit[day]) {
          const dayNum = DayToDayNumber[day];
          const raidTime: RaidTime = {raidGroup, startTime: weeklyRaidTime.startTime};
          if (!dayToTimes.has(dayNum)) {
            dayToTimes.set(dayNum, [raidTime]);
          } else {
            dayToTimes.get(dayNum).push(raidTime);
          }
        }
      }
    }
  }
  return dayToTimes;
}
