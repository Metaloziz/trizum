import { GamePresetT } from 'app/types/GameTypes';

export const presetOptions = (presets: Omit<GamePresetT, 'settings'>[]) => {
  const presetOpt = presets
    ?.filter(el => el.status !== 'archive')
    .map(item => ({
      value: item.name,
      label: item.name,
    }));
  if (Array.isArray(presetOpt)) return [{ value: '', label: 'Создать шаблон' }, ...presetOpt];
  return [{ value: '', label: 'Создать шаблон' }];
};