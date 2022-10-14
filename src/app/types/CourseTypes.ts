import { TimeZoneType } from 'app/types/TimeZoneType';
import { StatusTypes } from '../enums/StatusTypes';
import { WorkTypes } from '../enums/WorkTypes';

export type ResponseWork = {
  id: string;
  title: string;
  text: string;
  type: WorkTypes;
  gamePresetCount: number;
};

// course type from array
export type ShortCourseType = {
  id: string;
  type: string;
  status: StatusTypes | '';
  title: string;
  level: string;
  worksCount: number;
  createdAt: TimeZoneType;
  // works?: ResponseWork[];
};

// full course type
export type CourseType = ShortCourseType & {
  works: WorkWithCourseBonded[];
  // usedInGroups: string[]; // todo not sure
};

export type CurrentCourseResponse = {
  course: CourseType;
  usedInGroups: string[];
};

export type AnswerT = {
  text: string;
  correct: boolean;
};

export type GamePresetT = {
  gamePreset: {
    id: string;
    name: string;
    gameId: string;
  };
};

export type WorkWithCourseBonded = {
  id: string;
  index: number;
  work: Omit<ResponseWork, 'gamePresetCount'> & { gamePresets?: GamePresetT[] };
};
