import {Character} from './character';

export interface CharacterGroup {
  id: string;
  name: string;
  characters: Character[];
}
