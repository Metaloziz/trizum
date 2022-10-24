import { StatusEnum } from '../app/enums/StatusTypes';

export const getNameFromEnum = (key: string) => {
  const status = StatusEnum[key as keyof typeof StatusEnum];

  if (status) return status.toLowerCase();

  return '';
};
