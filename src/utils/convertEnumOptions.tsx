import { OptionT } from 'app/types/OptionT';

export const EMPTY_ROLE_VALUE = '';

export const convertEnumOptions = (enumObject: { [key: string]: string }): OptionT[] => {
  const keys: string[] = Object.keys(enumObject);
  const enumOptions = Object.values(enumObject).map((el, index) => ({
    label: el,
    value: keys[index],
  }));

  return [{ value: EMPTY_ROLE_VALUE, label: 'Не выбрано' }, ...enumOptions];
};
