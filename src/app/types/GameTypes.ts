import { StatusTypes } from 'app/enums/StatusTypes';

export type GameT = {
  code: string;
  name: string;
  type: string;
};

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
  errorAcceptable: number;
  speed: number;
  colorsMap: string[];
  delay: number;
  description: string;
  sound: SoundT;
};

export type EditOrCreatePresetParamsT = {
  gameCode?: string;
  name: string;
  settings: {
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
    errorAcceptable: number;
    speed: number;
    colorsMap: string[];
    delay: number;
    description: string;
    sound: SoundT;
  }[];
  level: string;
  status: string;
};

export type CreatePresetResponseT = {
  time: number;
  levelMaxCompleted: number;
  gameCode: string;
  actionsSuccessfulCount: number;
  actions: number;
  templateCode: number;
  speed: number;
};

export type GamePresetT = {
  id: string;
  name: string;
  game: GameT;
  status: StatusTypes;
  level: string;
  settings: PresetsGameSettings[];
};

export type OneGamePresent = {
  gamePreset: GamePresetT;
  usedInWorks: any[];
};

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
  gameCode: string;
  time: number;
  timeMax: number;
  createdAt: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  type: string;
};
export type PlayResultsResponseT = {
  item: PlayResultT[];
  page: number;
  perPage: number;
  total: number;
};

export type PlaySendResultT = {
  userGroupId: string;
  courseWorkId: string;
  workGamePresetId: string;
  finished: boolean;
  workCompleted: boolean;
  courseCompleted: boolean;
  timeMax: number;
  time: number;
  groupsCount: number;
  actionSpeedAv: number;
  elementsTotal: number;
  levelMaxCompleted: number;
  errorsPercentage: number;
  actionsSuccessfulCount: number;
  actions: number;
  actionSpeed: number;
  cycleTime: number;
  cycleTimeAv: number;
  wordsCount: number;
  phraseSpeedAv: number;
  speed: number;
  blinksCount: number;
};

export type ResultT = 'end' | 'lose' | 'win';

export type ResultsT = {
  time: number;
  timeDiff: number;
  score: number;
  success: number;
  failed: number;
  result: ResultT;
};

export type ResultsNewT = {
  levelMinCompleted?: number;
  levelMaxCompleted?: number;
  gameCode: string;
  templateCode: number;
  success: number; //+
  failed?: number; //+
  timeMax?: number;
  time: number; //+
  result: ResultT; //+
};

export const RESULT = {
  end: 'Конец игры',
  lose: 'Проигрыш',
  win: 'Победа',
};

export type GameIdWithCode = {
  gameId: string;
  gameCode: string;
};

export type GameProps = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};
