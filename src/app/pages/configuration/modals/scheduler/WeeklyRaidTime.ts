export interface WeeklyRaidTime {
  id?: string;
  weekMask: number;
  startTime: Time;
  endTime: Time;
}
export enum DaysInWeekBit {
  Mon = 1,
  Tues = 2,
  Wed = 4,
  Thu = 8,
  Fri = 16,
  Sat = 32,
  Sun = 64
}
export interface Time {
  hour: number;
  minute: number;
}
