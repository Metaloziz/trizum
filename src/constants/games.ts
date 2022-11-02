import { PresetsGameSettings } from 'app/types/GameTypes';

export const DEFAULT_GAME_SETTINGS: { [key: string]: Partial<PresetsGameSettings> } = {
  shulte: {
    timeComplete: 60,
    groupsCount: 1,
    digitMin: 1,
    digitMax: 10,
    elementsTotal: 3,
    colorsMap: ['#333', '#f00', '#0f0'],
  },
  battleColors: {
    timeComplete: 60,
    elementsTotal: 2,
    blinksCount: 2,
  },
  game2048: {},
  shiftVertical: {
    timeComplete: 100,
    cycleTime: 5,
    elementsTotal: 2,
    groupsCount: 2,
    blinksCount: 2,
  },
  steamEngine: {
    timeComplete: 60,
    errorAacceptable: 1,
    elementsTotal: 5,
  },
  silhouettes: {
    timeComplete: 10,
    elementsTotal: 2,
    digitMax: 4,
  },
  memoryRhythm: {
    timeComplete: 60,
    blinksCount: 2,
    levelMaxCompleted: 5,
    digitMax: 3,
    sound: 1,
  },
  fireflies: {
    timeComplete: 60,
    digitMax: 10,
    elementsTotal: 2,
  },
  argus: {
    elementsTotal: 2,
    errorAacceptable: 2,
    digitMax: 3,
    timeComplete: 10,
    speed: 2000,
  },
  mental: {},
};
