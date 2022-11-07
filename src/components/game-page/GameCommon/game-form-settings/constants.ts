import { GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusTypes } from 'app/enums/StatusTypes';
import { fieldSizeOptions } from 'utils/fieldSize';

export const TEN_DIGIT_MENU = fieldSizeOptions();
export const BASE_DEFAULT_VALUES = {
  name: '',
  level: GroupsLevelsValue.easy,
  status: StatusTypes.draft,
  description: undefined,
};
