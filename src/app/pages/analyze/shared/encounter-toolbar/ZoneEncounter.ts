import {Encounter, Zone} from 'src/app/shared/api/fflogs/models/Zone';

export interface ZoneEncounter {
  zone: Zone;
  encounter: Encounter;
}
