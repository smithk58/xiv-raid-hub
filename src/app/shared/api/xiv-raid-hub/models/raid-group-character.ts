import { Character } from 'src/app/shared/api/xiv-raid-hub/models/character';

export class RaidGroupCharacter {
    defaultClass: string;
    accepted?: boolean;
    order: number;
    character: Character;
}
