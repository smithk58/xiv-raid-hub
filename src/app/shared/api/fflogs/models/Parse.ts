export interface Parse {
  reportID: string;
  encounterID: number;
  fightID: number;
  characterID: number;
  encounterName: string;
  characterName: string;
  server: string;
  class: string;
  spec: string;
  rank: number;
  outOf: number;
  percentile: number;
  startTime: number;
  duration: number;
  difficulty: number;
  ilvlKeyOrPatch: number;
  total: number;
  estimated: boolean;
}
