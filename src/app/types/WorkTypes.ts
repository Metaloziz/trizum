import { WorkTypes } from 'app/enums/WorkTypes';
import { GamePresetT } from 'app/types/GameTypes';

export type PresetT = { gameId: string; id: string; name: string };

export type RequestCreateWork = {
  type: WorkTypes.HW;
  title: string;
  text: string;
  tests?: string[];
  gamePresets?: string[];
};
type createdAtT = {
  date: string;
  timezone_type: number;
  timezone: string;
};
export type WorksItemT = {
  id: string;
  status: string;
  title: string;
  text: string;
  type: WorkTypes.HW;
  gamePresetsCount: number;
  testsCount: number;
  createdAt: createdAtT;
};

export type WorksResponseT = {
  items: WorksItemT[];
  page: number;
  perPage: number;
  total: number;
};

export type OneWorkResponseT = {
  work: {
    id: string;
    status: string;
    title: string;
    text: string;
    type: WorkTypes.HW;
    createdAt: createdAtT;
    gamePresets: GamePresetT[];
  };
  usedInCourses: [];
};

export type CreatOrEditWorkRequest = {
  title?: string;
  gamePresets?: string[];
  type?: WorkTypes;
  status?: string;
};
