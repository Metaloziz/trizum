import { SelectChangeEvent } from '@mui/material';
import { Nullable } from 'app/types/Nullable';
import { ChangeEvent } from 'react';

export const convertNullToArray = (value: Nullable<string[]>) => {
  if (value === null || value.length === 0) {
    return ['null'];
  }

  return value;
};

export const convertArrayToNull = (event: string[]) => {
  const newEvent = event.filter(item => item !== 'null');
  if (newEvent.length === 0) {
    return null;
  }
  return newEvent;
};

export const convertNullStringToNull = (event: SelectChangeEvent) => {
  if (event.target.value === 'null') {
    return null;
  }
  return event;
};

export const convertEmptyStringToNull = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  if (event.target.value === '') {
    return null;
  }
  return event;
};
