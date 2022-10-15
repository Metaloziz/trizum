import { Group } from 'app/types/LoadMeTypes';

export const getGameForStudent = (groupAr: Group[]) => {
  const gameIdsWithCode = groupAr?.map(el =>
    el.group?.course?.works?.map(work => {
      if (work && work.work && work.work.gamePresets && work.work.gamePresets.length) {
        return work.work.gamePresets.map(preset => ({
          gameId: preset.id,
          gameCode: preset?.gamePreset?.game?.code || 'unknown',
        }));
      }
      return [];
    }),
  );
  const unpack = (arr: any[]): any => {
    if (arr.length && Array.isArray(arr[0])) {
      return unpack(arr[0]);
    }
    return arr;
  };
  return unpack(gameIdsWithCode);
};
