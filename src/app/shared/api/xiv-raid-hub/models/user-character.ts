import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';

export interface UserCharacter {
  characterId: number;
  userId: number;
  isOwner: boolean;
  defaultClass: string;
  character: Character;
}
