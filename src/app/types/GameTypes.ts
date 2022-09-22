export type GameT = {
  code: string;
  name: string;
  type: string;
};

export type GamesT = Omit<GameT, 'code'>[];

export type PresetsGameSettings = {
  timeComplete: number;
  elementsTotal: number;
  levelMaxCompleted?: number;
  gameCode?: string;
  cycleTime?: number;
  wordsCount?: number;
  digitMax?: number;
  templateCode?: number;
  groupsCount?: [];
  blinksCount?: number;
  errorAcceptable?: number;
  speed?: number;
  sizeX?: number;
  sizeY?: number;
  colorsMap?: string[];
  delay?: number;
  level?: number;
  colorCount?: number;
  forms?: number;
};

export type EditOrCreatePresetParamsT = {
  gameCode?: string;
  name: string;
  settings: PresetsGameSettings[];
  level?: string;
  status?: string;
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
  status: string;
  level: string;
  settings: PresetsGameSettings[];
};

export type OneGamePresent = {
  gamePreset: GamePresetT;
  usedInWorks: [];
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
