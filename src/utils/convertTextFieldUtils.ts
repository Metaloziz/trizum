import { Nullable } from 'app/types/Nullable';
import { ChangeEvent } from 'react';

export const convertEmptyStringToNull = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  if (event.target.value === '') {
    return null;
  }
  return event;
};

export const convertNullToEmptyString = (value: Nullable<string | number>) => {
  if (value === null) {
    return '';
  }
  return value;
};
