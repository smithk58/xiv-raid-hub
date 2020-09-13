import { RaidGroupCharacter } from 'src/app/shared/api/xiv-raid-hub/models/raid-group-character';

export interface RaidGroup {
  id?: number;
  owner?: any; // TODO maybe isOwner: boolean instead
  name: string;
  purpose?: string;
  hasSchedule?: boolean;
  share: boolean;
  characters: RaidGroupCharacter[];
}
