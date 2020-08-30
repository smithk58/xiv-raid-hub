import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';
import { WeeklyRaidTime } from 'src/app/pages/configuration/modals/scheduler/WeeklyRaidTime';

export interface CharacterGroup {
  id?: string;
  name: string;
  characters: Character[];
  schedule?: WeeklyRaidTime[];
}
