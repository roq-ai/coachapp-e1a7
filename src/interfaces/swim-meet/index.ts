import { EventInterface } from 'interfaces/event';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SwimMeetInterface {
  id?: string;
  name: string;
  date: any;
  team_manager_id: string;
  created_at?: any;
  updated_at?: any;
  event?: EventInterface[];
  user?: UserInterface;
  _count?: {
    event?: number;
  };
}

export interface SwimMeetGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  team_manager_id?: string;
}
