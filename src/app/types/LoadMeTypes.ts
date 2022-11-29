import { GameT, ResultsNewT } from 'app/types/GameTypes';
import { GroupT } from 'app/types/GroupTypes';
import { Nullable } from 'app/types/Nullable';
import { ScheduleObjectType } from 'app/types/ScheduleT';
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

export type WorksGroupType = {
  [key: string]: WorksDataType;
};

export type WorksDataType = {
  completed: boolean;
  index: string;
  workId: string;
  games: { [key: string]: WorksGamesDataType };
};

export type WorksGamesDataType = {
  finished: boolean;
  gamePresetId: string;
  playResultId: string;
  result: WorksGroupResultType;
};

export type WorksGroupResultType = Omit<ResultsNewT, 'finished' | 'gameCode' | 'templateCode'>;

export type Group = {
  id: string;
  stats:
    | {
        completed: boolean;
        works: WorksGroupType;
      }
    | [];
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
    schedule: ScheduleObjectType;
    level: string;
    type: string;
    status: string;
    teacher: TeacherFromLoadme;
  };
};
