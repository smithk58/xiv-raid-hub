export interface Ranking {
  reportID: string;
  name: string;
  class: number; /*always 1*/
  spec: number; /**/
  regionName: string;
  serverName: string;
  guildName: string;
  patch: number;
  exploit: number;
  fightID: number;
  startTime: number;
  duration: number;
  total: number;
}
export interface RankingPagesWrapper {
  count: number;
  hasMorePages: boolean;
  page: number;
  rankings: Ranking[];
}
