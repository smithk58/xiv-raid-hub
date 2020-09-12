import parseISO from 'date-fns/parseISO';

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
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
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
 * @param weeklyRaidTimes - The list of weekly raid times to use weekMask/times from.
 */
export function dayToRaidTimesMap(weeklyRaidTimes: WeeklyRaidTime[]): Map<number, RaidTime[]> {
  const dayToTimes = new Map<number, RaidTime[]>();
  for (const weeklyRaidTime of weeklyRaidTimes) {
    for (const day of DaysInWeek) {
      // tslint:disable-next-line:no-bitwise - I do what I want >:(
      if (weeklyRaidTime.weekMask & DaysInWeekBit[day]) {
        const dayNum = DayToDayNumber[day];
        const startTime = parseISO(weeklyRaidTime.startTime);
        if (!dayToTimes.has(dayNum)) {
          dayToTimes.set(dayNum, [{raidGroupId: weeklyRaidTime.raidGroupId, startTime}]);
        } else {
          dayToTimes.get(dayNum).push({raidGroupId: weeklyRaidTime.raidGroupId, startTime});
        }
      }
    }
  }
  return dayToTimes;
}
