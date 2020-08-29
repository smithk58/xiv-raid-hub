import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';

export interface CharacterGroup {
  id?: string;
  name: string;
  characters: Character[];
  schedule?: any;
}
