import { GroupLevels } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { Nullable } from 'app/types/Nullable';
import { ScheduleObjectType } from 'app/types/ScheduleT';

export type OlympiadPayloadType = {
  name: string;
  dateSince: Date;
  dateUntil: Date;
  franchiseId?: string;
  courseId: string;
  type: 'olympiad';
  forGroupId?: string;
  level: keyof typeof GroupLevels;
  description: string;
  schedule: Partial<ScheduleObjectType>;
};

export type OlympiadFormType = {
  id?: string;
  name: string;
  dateSince: Nullable<Date>;
  franchiseId?: Nullable<string>;
  courseId: string;
  type?: 'olympiad';
  forGroupId?: Nullable<string>;
  level: Nullable<keyof typeof GroupLevels>;
  description?: string;
  schedule: Partial<ScheduleObjectType>;
  status: StatusTypes;
  dateStart?: Nullable<Date>;
};
