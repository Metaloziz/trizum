import { StatusTypes, StatusEnum } from '../app/enums/StatusTypes';

export const getEnumName = (status: string) => {
  const name = status as StatusTypes;

  return StatusEnum[name].toLowerCase();
};
