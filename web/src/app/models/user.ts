import { Rig } from './rig';
export interface User{
  ipAddress: string;
  lastPingCheck: string;
  poolMonitoring: any;
  rigs: Rig[];
}
