import { CountdownConfig } from 'ngx-countdown';
import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';

export interface RaidTimeDisplay {
  raidGroup: RaidGroup;
  raidDateTime: Date;
  countdownConfig?: CountdownConfig;
}
export interface RaidDayDisplay {
  date: Date;
  daysAwayInWords: string;
  raidTimeDisplays: RaidTimeDisplay[];
}
