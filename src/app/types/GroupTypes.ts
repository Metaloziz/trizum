import { DateTime } from 'app/enums/DateTime';
import { GroupLevels } from 'app/enums/GroupLevels';
import { GroupTypes } from 'app/enums/GroupTypes';
import { UserGroupStatus } from 'app/enums/UserGroupStatus';
import { EmptyUser } from 'app/stores/emptyUser';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { GamePresetFromLoadme } from 'app/types/LoadMeTypes';
import { Nullable } from 'app/types/Nullable';
import { ScheduleObjectType } from 'app/types/ScheduleT';
import { StatusT } from 'app/types/StatusT';

import { TimeZoneType } from 'app/types/TimeZoneType';
import moment from 'moment';
import { getNextWeek } from 'utils/getNextWeek';
import { GroupTeacherType } from './GroupTeacherType';

export type TeacherIdWTF = { id: string; firstName: string; middleName: string; lastName: string };
export type FranchiseWTF = { id: string; shortName: string };

export type ResponseGroups = {
  id: string;
  name: string;
  type: Nullable<string>;
  status: Nullable<string>;
  level: LevelGroupT;
  startedAt: TimeZoneType;
  endedAt: TimeZoneType;
  createdAt: TimeZoneType;
  franchise: FranchiseWTF;
  course: string;
  teacherId: TeacherIdWTF;
  schedule: ScheduleObjectType;
};

export type WorkT = {
  id: string;
  title: string;
  text: null | string;
  status: StatusT;
  type: string;
  gamePresets: GamePresetFromLoadme[];
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
};

export type WorksT = {
  id: string;
  index: null | number;
  work: WorkT;
};

export class ResponseOneGroupCourse {
  id = '';

  type = '';

  status = '';

  title = '';

  level = '';

  worksCount = 0;

  createdAt = new TimeZoneType();

  works: WorksT[] = [];
}

export class UsersDataT {
  id: string = '';

  stats: StatusT[] = [];

  status: UserGroupStatus = UserGroupStatus.active;

  user = new EmptyUser();
}

export class ResponseOneGroup {
  id: string = '';

  stats: any[] = [];

  name: string = '';

  type: GroupT = 'blocks';

  status: StatusT = 'draft';

  level: LevelGroupT = 'easy';

  teacher = new GroupTeacherType();

  startedAt = new TimeZoneType();

  endedAt = new TimeZoneType();

  franchise = new FranchiseT();

  course = new ResponseOneGroupCourse();

  users = [new UsersDataT()];

  schedule: ScheduleObjectType = { classworks: [], homeworks: [] };

  onlyGroup?: [] | null = null;

  teacherId = {
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
  };
}

export class LessonT {
  id: string;

  name: string;

  date: Date;

  from: Date;

  to: Date;

  constructor(addCount?: number) {
    const day = addCount ? getNextWeek(addCount) : new Date();

    const today = moment(day)
      .format(DateTime.DdMmYyyy)
      .split('.')
      .map(el => Number(el));
    this.name = '';
    this.id = (Math.random() * 100).toString();
    this.date = day;
    this.from = new Date(today[2], today[1], today[0], 8, 0);
    this.to = new Date(today[2], today[1], today[0], 8, 45);
  }
}

export type GroupT = keyof typeof GroupTypes;
export type LevelGroupT = keyof typeof GroupLevels;

export type CreateGroup = {
  name: string;
  franchiseId: string;
  type: GroupT;
  teacherId: string;
  level: LevelGroupT;
  courseId: string;
  status: StatusT;
  schedule?: ScheduleObjectType;
};
export type CreateGroupForServer = {
  dateSince: string;
  dateUntil: string;
} & CreateGroup;

export type CreateGroupFroUI = {
  dateSince: Date;
  dateUntil: Date;
} & CreateGroup;

export type Schedule = { name: string; date: string; from: string; to: string };

export type ScheduleForUI = {
  franchise: string;
  teacherId: string;
  groupName: string;
  groupId: string;
  lesson: string;
  start: Date;
  end: Date;
  id: number;
};

export type GroupParams = Partial<{
  perPage: number;
  page: number;
  franchiseId: string;
  forGroupId: string;
  type: string;
  teacherId: string;
  name: string;
  level: string;
  schedule: Schedule[];
  status?: string;
}>;

export type GroupParamsForUI = Partial<{
  dateSince: Date | string;
  dateUntil: Date | string;
}> &
  GroupParams;

export type GroupParamsForServer = Partial<{
  dateSince: string;
  dateUntil: string;
}> &
  GroupParams;
