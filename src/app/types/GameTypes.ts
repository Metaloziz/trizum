import { GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { Nullable } from 'app/types/Nullable';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { DifferenceGameLevel } from 'components/game-page/GameCommon/game-form-settings/game-form-types';
import { FrazesDictionary } from 'games/games/frazes/types';

export class GameT {
  code: string = '';

  name: string = '';

  type: string = '';
}

export type GamesT = Omit<GameT, 'code'>[];
export type SoundT = 0 | 1 | undefined;
export type PresetsGameSettings = {
  timeComplete: number;
  elementsTotal: number;
  levelMaxCompleted: number;
  gameCode: string;
  cycleTime: number;
  wordsCount: number;
  digitMax: number;
  digitMin: number;
  templateCode: number;
  groupsCount: number;
  blinksCount: number;
  errorAacceptable: number;
  speed: number;
  colorsMap: string[];
  delay: number;
  description: string;
  sound: SoundT;
  area: boolean;
  gage: GageType[];
  wordsFull: boolean;
  words: FrazesDictionary[];
  differenceGameLevels: DifferenceGameLevel[];
  perSuccessLevel: number;
  maxErrorLevel: number;
  upgrade: number;
  downgrade: number;
  changeLevelDictionary: number;
  errorLevel: number;
};

export type EditOrCreatePresetParamsT = {
  gameCode?: string;
  name: string;
  settings: {
    timeComplete: number;
    timeMax: number;
    elementsTotal: number;
    levelMaxCompleted: number;
    gameCode: string;
    cycleTime: number;
    wordsCount: number;
    digitMax: number;
    digitMin: number;
    templateCode: number;
    groupsCount: number;
    blinksCount: number;
    errorAcceptable: number;
    speed: number;
    colorsMap: string[];
    delay: number;
    description: string;
    sound: SoundT;
    area: boolean;
  }[];
  level: string;
  status: string;
  timeMax: number;
};

export type GamePresetT = {
  id: string;
  name: string;
  game: GameT;
  status: StatusTypes;
  level: GroupsLevelsValue;
  timeMax: number;
  settings: Partial<PresetsGameSettings>[];
  createdAt?: TimeZoneType;
};

export type OneGamePresent = {
  gamePreset: GamePresetT;
  usedInWorks: any[];
};

export class PlayResultsSearchParams {
  user_id: string = '';

  game_preset_id: string = '';

  group_id: string = '';

  game_code: string = '';

  created_since: string = '';

  created_until: string = '';

  page: string = '';

  work_id: string = '';

  per_page: number = 1000;
}

export type GamePresetsResponseT = {
  items: Omit<GamePresetT, 'settings'>[];
  perPage: number;
  page: number;
  total: number;
};

export type PlayResultT = {
  id: string;
  playerId: string;
  userGroup: string;
  workGamePreset: string;
  gamePreset: string;
  gameCode: string;
  time: number;
  timeMax: number;
  createdAt: TimeZoneType;
  type: string;
  levelMinCompleted: number;
  levelMaxCompleted: number;
  success: number;
  failed: number;
  finished: boolean;
};
export type PlayResultsResponseT = {
  items: PlayResultT[];
  page: number;
  perPage: number;
  total: number;
};

export type PlaySendResultT = {
  userGroupId: string;
  courseWorkId: string;
  workGamePresetId: string;

  workCompleted: boolean;
  courseCompleted: boolean;

  time: number;
  finished: boolean;
  levelMinCompleted: number;
  levelMaxCompleted: number;
  success: number;
  failed: number;
};

export type ResultT = 'end' | 'lose' | 'win';

export type ResultsNewT = {
  levelMinCompleted?: number;
  levelMaxCompleted?: number;
  gameCode: string;
  templateCode: number;
  success: number;
  failed?: number;
  timeMax?: number;
  time: number;
  finished: boolean;
  score?: number;
};

export type GameIdWithCode = {
  gameId: string;
  gameCode: string;
};

export type GameProps = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

export type GageType = {
  speed?: Nullable<number>;
  area: boolean;
  id: number;
};
