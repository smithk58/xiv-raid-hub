export interface WeeklyRaidTime {
  weekMask: number;
  startTime: string; /*ISO time string*/
}
export enum DaysInWeekBit {
  Mon = 1,
  Tue = 2,
  Wed = 4,
  Thu = 8,
  Fri = 16,
  Sat = 32,
  Sun = 64
}
export const DaysInWeek = Object.keys(DaysInWeekBit).filter(x => isNaN(Number(x)));

/**
 * Calculates the days in week mask via an array of booleans, where true implies it's included in the mask.
 * @param values - An array of booleans that representing which days should be included in the mask.
 */
export function CalculateDaysInWeekMask(values: boolean[]): number {
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
export function daysInWeekMaskToBools(mask: number): boolean[] {
  const bools = [];
  for (const day of DaysInWeek) {
    // tslint:disable-next-line:no-bitwise - I do what I want >:(
    bools.push(mask & DaysInWeekBit[day] ? true : false);
  }
  return bools;
}
