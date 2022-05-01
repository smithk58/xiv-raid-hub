/*Random static utils*/
export class Utils {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line
      const r = Math.random() * 16 | 0;
      // tslint:disable-next-line
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  static enumToArray(enumObj) {
    return Object.keys(enumObj).filter(key => isNaN(Number(key)));
  }
}
/*APIs y you no have this >:(?*/
export enum ClassToRole {
  'Astrologian' = 'healer',
  'White Mage' = 'healer',
  'Scholar' = 'healer',
  'Sage' = 'healer',
  'Warrior' = 'tank',
  'Paladin' = 'tank',
  'Dark Knight' = 'tank',
  'Gunbreaker' = 'tank',
  'Bard' = 'dps',
  'Dancer' = 'dps',
  'Machinist' = 'dps',
  'Dragoon' = 'dps',
  'Monk' = 'dps',
  'Ninja' = 'dps',
  'Samurai' = 'dps',
  'Summoner' = 'dps',
  'Red Mage' = 'dps',
  'Reaper' = 'dps',
  'Black Mage' = 'dps'
}
/*APIs y you no have this either >:(?? Maps XIVApis DC list to region*/
export enum DCToRegion {
  Aether = 'na',
  Chaos = 'eu',
  Elemental = 'jp',
  Gaia = 'jp',
  Mana = 'jp',
  Primal = 'na',
}

export enum ExpansionToBracketMin {
  'Heavensward' = 3,
  'Stormblood' = 4,
  'Shadowbringers' = 5
}

export enum ExpansionToDefaultZone {
  'Stormblood' = 25 /*zone id of omega alphascape*/
}

