import { AttendanceInterface } from 'interfaces/attendance';
import { EventInterface } from 'interfaces/event';
import { TrainingPlanInterface } from 'interfaces/training-plan';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface SwimmerInterface {
  id?: string;
  first_name: string;
  last_name: string;
  team_id: string;
  created_at?: any;
  updated_at?: any;
  attendance?: AttendanceInterface[];
  event?: EventInterface[];
  training_plan?: TrainingPlanInterface[];
  team?: TeamInterface;
  _count?: {
    attendance?: number;
    event?: number;
    training_plan?: number;
  };
}

export interface SwimmerGetQueryInterface extends GetQueryInterface {
  id?: string;
  first_name?: string;
  last_name?: string;
  team_id?: string;
}
