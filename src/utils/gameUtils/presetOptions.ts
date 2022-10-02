import { GamePresetT } from 'app/types/GameTypes';

export const presetOptions = (presets: Omit<GamePresetT, 'settings'>[]) => {
  const presetOpt = presets.map(item => ({ value: item.name, label: item.name }));
  return [{ value: '', label: 'Создать шаблон' }, ...presetOpt];
};
