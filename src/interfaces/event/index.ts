import { SwimMeetInterface } from 'interfaces/swim-meet';
import { SwimmerInterface } from 'interfaces/swimmer';
import { GetQueryInterface } from 'interfaces';

export interface EventInterface {
  id?: string;
  name: string;
  swim_meet_id: string;
  swimmer_id: string;
  created_at?: any;
  updated_at?: any;

  swim_meet?: SwimMeetInterface;
  swimmer?: SwimmerInterface;
  _count?: {};
}

export interface EventGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  swim_meet_id?: string;
  swimmer_id?: string;
}
