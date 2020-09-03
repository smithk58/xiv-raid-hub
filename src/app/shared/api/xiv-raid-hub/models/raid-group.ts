import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

export interface RaidGroup {
  id?: string;
  name: string;
  purpose: string;
  characters: Character[];
  weeklyRaidTimes: WeeklyRaidTime[];
}
