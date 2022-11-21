import { StatusEnum } from 'app/enums/StatusTypes';
import { GamePresetT } from 'app/types/GameTypes';
import { Option } from 'components/select-mui/CustomSelect';

export const getPresetArrOptions = (actualPreset: Omit<GamePresetT, 'settings'>[]) => {
  const presetArr: Option[] = [
    {
      value: 'newSample',
      label: 'Создать шаблон',
    },
  ];
  actualPreset?.map(el => {
    presetArr.push({
      value: el.id,
      label: `${el.name} /Статус: ${StatusEnum[el.status]}`,
    });
    return el;
  });
  return presetArr;
};
