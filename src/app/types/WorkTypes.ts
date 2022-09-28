import { WorkTypes } from 'app/enums/WorkTypes';
import { GamePresetT } from 'app/types/GameTypes';
import { PaginationResponse } from 'app/types/PaginationResponse';

export type PresetT = { gameId: string; id: string; name: string };

export type RequestCreateWork = {
  type: WorkTypes.HW;
  title: string;
  text: string;
  tests?: string[];
  gamePresets?: string[];
};
type CreatedAtT = {
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
  createdAt: CreatedAtT;
};

export type WorksResponseT = PaginationResponse<WorksItemT>;
// {
//   items: WorksItemT[];
//   page: number;
//   perPage: number;
//   total: number;
// };

export type WorkGamePresetT = {
  id: string;
  gamePreset: GamePresetT;
};

export type OneWorkResponseT = {
  work: {
    id: string;
    status: string;
    title: string;
    text: string;
    type: WorkTypes.HW;
    createdAt: CreatedAtT;
    gamePresets: WorkGamePresetT[];
  };
  usedInCourses: [];
};

export type CreatOrEditWorkRequestT = {
  id?: string;
  title?: string;
  text?: string;
  gamePresets?: string[];
  type?: WorkTypes;
  status?: string;
};
