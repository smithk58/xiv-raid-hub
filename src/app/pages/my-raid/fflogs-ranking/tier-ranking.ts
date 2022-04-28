export interface TierRanking {
  name: string;
  expansion: string;
  bestPerfAvg: number;
  medianPerfAvg: number;
  totalKills: number;
  encounters: Encounter[];
}
export interface Encounter {
  name: string;
  bestPercent: number;
  medPercent: number;
  highestRDPS: number;
  totalKills: number;
}
