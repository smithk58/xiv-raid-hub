import { CountdownConfig } from 'ngx-countdown';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';

export interface RaidTimeDisplay {
  raidGroup: RaidGroup;
  raidDateTime: Date;
}
export interface RaidDayDisplay {
  day: string;
  raidTimeDisplays: RaidTimeDisplay[];
}
