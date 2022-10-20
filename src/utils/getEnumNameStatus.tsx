import { StatusTypes, StatusEnum } from '../app/enums/StatusTypes';

export const getEnumNameStatus = (status: string) => {
  const name = status as StatusTypes;

  const result = StatusEnum[name];

  if (result) {
    return result.toLowerCase();
  }
  return result;
};
