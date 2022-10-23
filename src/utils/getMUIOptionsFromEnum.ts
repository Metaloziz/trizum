import { ReactNode } from 'react';
import { getOptionMui } from './getOption';

export const getMUIOptionsFromEnum = <T>(enumObject: T): ReactNode[] =>
  Object.keys(enumObject).map(el =>
    // @ts-ignore
    getOptionMui(el.toLowerCase(), enumObject[el]),
  );
