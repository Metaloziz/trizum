// import { GroupsItemsType } from 'app/types/GroupTypes';
import { OptionT } from 'app/types/OptionT';

export const fieldSizeOptions = (): OptionT[] =>
  ['2', '3', '4', '5', '6', '7', '8', '9', '10'].map(item => ({
    value: item,
    label: item,
  }));
