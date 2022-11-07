import { SelectChangeEvent } from '@mui/material';
import { GageType } from 'app/types/GameTypes';

export const ChangeGage = (event: SelectChangeEvent, value: GageType[]) => {
  const eventValue = Number(event.target.value);
  let newValue: GageType[];

  if (value.length < eventValue) {
    const lengthArray = eventValue - value.length;
    const lastId = value.at(-1)?.id;
    const tempArray: GageType[] = [];

    for (let i = 1; i < lengthArray + 1; i++) {
      tempArray.push({ id: lastId! + i, area: true, speed: 1 });
    }

    newValue = [...value, ...tempArray];
    newValue.map((item, index) => (item.id = index + 1));
  } else {
    newValue = value.slice(0, eventValue);
  }

  return newValue;
};
