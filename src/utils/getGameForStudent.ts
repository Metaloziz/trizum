import { Group } from 'app/types/LoadMeTypes';
import { GameIdWithCode } from 'app/types/GameTypes';

export const getGameForStudent = (groupAr: Group[]) => {
  const classType = groupAr.find(el => el.group.type === 'class');

  if (!classType) return [];

  const gameIdsWithCode: GameIdWithCode[][] = classType.group.course.works.map(work => {
    if (work && work.work && work.work.gamePresets && work.work.gamePresets.length) {
      return work.work.gamePresets.map(preset => ({
        gameId: preset.gamePreset.id,
        gameCode: preset?.gamePreset?.game?.code || 'unknown',
      }));
    }
    return [];
  });

  return gameIdsWithCode.filter(el => el.filter(item => item)) as GameIdWithCode[][];
};
