import { ScheduleHomeWorksType } from 'app/types/scheduleHomeWorksType';

export type ScheduleT = {
  name: string;
  date: string;
  from: string;
  to: string;
};

export type ShortScheduleT = Pick<ScheduleT, 'date' | 'from'>;

// new 27.11

export type ScheduleObjectType = { classworks: ScheduleT[]; homeworks: ScheduleHomeWorksType[] };
