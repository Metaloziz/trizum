import { IArea } from '@bmunozg/react-image-area';
import { GageType, GamePresetT } from 'app/types/GameTypes';
import { Nullable } from 'app/types/Nullable';
import { Point } from 'games/games/difference/types';
import { FrazesDictionary } from 'games/games/frazes/types';

export type FormSettingsType = {
  onFormSubmit: (value: GamesFormSettingsType) => void;
  usedInWorks: any[];
  gamePreset: GamePresetT;
  deletedPreset: () => void;
  createCopy: () => void;
};

export type BaseGameSettingsType = {
  name: string;
  level: string;
  status: string;
  description?: Nullable<string>;
};

export type BaseGameWithEngineType = {
  perSuccessLevel: number;
  maxErrorLevel: number;
  upgrade: number;
  downgrade: number;
};

export type ShiftVerticalGameSettingsType = {
  timeComplete?: Nullable<number>;
  cycleTime: Nullable<number>;
  elementsTotal: number;
  groupsCount: number;
  blinksCount: number;
};

export type ShiftVerticalFormType = BaseGameSettingsType &
  BaseGameWithEngineType &
  ShiftVerticalGameSettingsType;

export type ShulteGameSettingsType = {
  timeComplete?: Nullable<number>;
  elementsTotal: number;
  digitMin: number;
  colorsMap: string[];
};

export type ShulteFormType = BaseGameSettingsType & BaseGameWithEngineType & ShulteGameSettingsType;

export type Game2048GameSettingsType = {
  timeComplete: number;
  elementsTotal: number;
  digitMax: number;
  groupsCount: number;
};

export type Game2048FormType = BaseGameSettingsType & Game2048GameSettingsType;

export type BattlerColorsGameSettingsType = {
  timeComplete: number;
  elementsTotal: number;
  blinksCount: number;
};

export type BattlerColorsFormType = BaseGameSettingsType & BattlerColorsGameSettingsType;

export type MemoryRhythmGameSettingsType = {
  timeComplete: number;
  blinksCount: number;
  levelMaxCompleted: number;
  digitMax: number;
  sound: number;
};

export type MemoryRhythmFormType = BaseGameSettingsType &
  BaseGameWithEngineType &
  MemoryRhythmGameSettingsType;

export type ArgusGameSettingsType = {
  timeComplete: number;
  elementsTotal: number;
  errorAacceptable: number;
  digitMax: number;
  speed: number;
};

export type ArgusFormType = BaseGameSettingsType & BaseGameWithEngineType & ArgusGameSettingsType;

export type FirefliesGameSettingsType = {
  timeComplete: number;
  elementsTotal: number;
  levelMaxCompleted: Nullable<number>;
  digitMax: number;
  speed?: Nullable<number>;
};

export type FirefliesFormType = BaseGameSettingsType &
  BaseGameWithEngineType &
  FirefliesGameSettingsType;

export type SilhouettesGameSettingsType = {
  timeComplete: number;
  elementsTotal: number;
  digitMax: number;
};

export type SilhouettesFormType = BaseGameSettingsType &
  BaseGameWithEngineType &
  SilhouettesGameSettingsType;

export type SteamEngineGameSettingsType = {
  timeComplete: number;
  elementsTotal: number;
  errorAacceptable: Nullable<number>;
  gage: GageType[];
};

export type SteamEngineFormType = BaseGameSettingsType &
  BaseGameWithEngineType &
  SteamEngineGameSettingsType;

export type DifferenceGameImage = {
  id: string;
  path: string;
};

export type DifferenceGameLevel = {
  images: DifferenceGameImage[];
  differences: { areas: IArea[]; points: Point[] };
};

export type GameDifferenceSettingsType = {
  timeComplete: number;
  errorAacceptable: number;
  differenceGameLevels: DifferenceGameLevel[];
};

export type GameDifferenceFormType = BaseGameSettingsType & GameDifferenceSettingsType;

export type FrazesGameSettingsType = {
  errorAacceptable: number;
  timeComplete: number;
  speed: number;
  wordsFull: boolean;
  errorLevel: number;
  changeLevelDictionary: number;
  words: FrazesDictionary[];
};

export type FrazesFormType = BaseGameSettingsType & FrazesGameSettingsType;

export type BullsAndCowsSettingsType = {
  timeComplete: number;
  levelMaxCompleted: number;
  errorAacceptable: number;
  digitMax: number;
};

export type BullsAndCowsFormType = BaseGameSettingsType & BullsAndCowsSettingsType;

export type GamesFormSettingsType = BaseGameSettingsType &
  (
    | ShiftVerticalFormType
    | ShulteGameSettingsType
    | Game2048FormType
    | BattlerColorsFormType
    | MemoryRhythmFormType
    | SilhouettesFormType
    | SteamEngineFormType
    | GameDifferenceFormType
    | FrazesFormType
    | BullsAndCowsFormType
  );
