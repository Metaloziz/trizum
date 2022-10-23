import { GameT } from 'app/types/GameTypes';
import { GroupT } from 'app/types/GroupTypes';
import { Nullable } from 'app/types/Nullable';
import { StatusT } from 'app/types/StatusT';
import { TimeZoneType } from 'app/types/TimeZoneType';

export type TeacherFromLoadme = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
};

export type ScheduleFromLoadme = {
  name: string;
  date: string;
  from: string;
  to: string;
};
export type GamePresetFromLoadme = {
  id: string;
  gamePreset: {
    id: string;
    name: string;
    game: GameT;
    status: StatusT;
    level: string;
    createdAt: TimeZoneType;
  };
};

export type WorkFromLoadme = {
  id: string;
  status: string;
  title: string;
  text: string;
  type: string;
  createdAt: TimeZoneType;
  gamePresets: GamePresetFromLoadme[];
};

export type WorkWithIdFromLoadme = {
  id: string;
  index: number;
  work: WorkFromLoadme;
};

export type Group = {
  id: string;
  stats: any[];
  status: string;
  group: {
    id: string;
    name: string;
    franchiseId: string;
    onlyGroup: Nullable<any>;
    course: {
      id: string;
      type: GroupT;
      status: string;
      title: string;
      level: string;
      worksCount: number;
      createdAt: {
        date: string;
        timezone_type: number;
        timezone: string;
      };
      works: WorkWithIdFromLoadme[];
    };
    schedule: ScheduleFromLoadme[];
    level: string;
    type: string;
    status: string;
    teacher: TeacherFromLoadme;
  };
};
