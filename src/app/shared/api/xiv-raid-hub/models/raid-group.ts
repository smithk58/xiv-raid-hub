import { RaidGroupCharacter } from 'src/app/shared/api/xiv-raid-hub/models/raid-group-character';

export interface RaidGroup {
  id?: number;
  ownerId?: number;
  name: string;
  purpose?: string;
  hasCharacters?: boolean;
  hasSchedule?: boolean;
  share: boolean;
  characters?: RaidGroupCharacter[];
  isOwner?: boolean; /*calculated by FE*/
}
