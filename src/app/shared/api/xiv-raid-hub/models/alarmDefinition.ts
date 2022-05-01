import { RaidGroup } from 'src/app/shared/api/xiv-raid-hub/models/raid-group';

export enum AlarmType {
  user = 'user',
  channel = 'channel'
}
export interface AlarmDefinition {
  id?: number;
  type: AlarmType;
  targetGuildId: string;
  targetId: string;
  targetName?: string;
  targetRoleId?: string;
  targetRoleName?: string;
  offsetHour: number;
  isEnabled: boolean;
  raidGroupId: number;
  raidGroup?: RaidGroup;
}
