import { OptionT } from 'app/types/OptionT';

export const convertEnumInOptions = (
  enumObject: { [key: string]: string },
  exclusion?: string[],
) => {
  const keys: string[] = Object.keys(enumObject);
  const enumOptions: OptionT[] = [];

  Object.values(enumObject).forEach((el, index) => {
    if (exclusion?.includes(el)) return;
    enumOptions.push({ label: el, value: keys[index] });
  });

  return enumOptions;
};
