import { StatusTypes, StatusEnum } from '../app/enums/StatusTypes';

export const getEnumNameStatus = (status: string) => {
  const name = status as StatusTypes;

  return StatusEnum[name].toLowerCase();
};
