import { StatusEnum, StatusTypes } from 'app/enums/StatusTypes';
import { GamePresetT } from 'app/types/GameTypes';
import { Option } from 'components/select-mui/CustomSelect';

export const presetArray = (actualPreset: Omit<GamePresetT, 'settings'>[]) => {
  const presetArr: Option[] = [
    {
      value: 'Создать шаблон',
      label: 'Создать шаблон',
    },
  ];
  actualPreset?.map(el =>
    presetArr.push({
      value: el.name,
      label: `${el.name} \n ${StatusEnum[el.status]}`,
    }),
  );
  return presetArr;
};
