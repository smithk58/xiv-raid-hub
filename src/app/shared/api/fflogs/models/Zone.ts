export interface Zone {
  id: number;
  name: string;
  brackets: Bracket;
  encounters: Encounter[];
  frozen: boolean;
  partitions?: Partition[];
}
export interface Encounter {
  id: number;
  name: string;
}
export interface Bracket { /*Bucket for what patch the fight belongs to?*/
  min: number;
  max: number;
  bucket: number;
}
export interface Partition {
  name: string;
  compact: string;
  area?: number;
  default?: boolean; /*Returned on one partition as true, otherwise undefined*/
}
