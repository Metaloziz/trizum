import { WorkTypes } from 'app/enums/WorkTypes';
import { GamePresetT } from 'app/types/GameTypes';

export type PresetT = { gameId: string; id: string; name: string };

export type RequestCreateWork = {
  type: WorkTypes;
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
