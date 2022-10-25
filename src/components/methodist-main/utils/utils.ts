import { GroupLevels } from '../../../app/enums/GroupLevels';
import { GroupTypes } from '../../../app/enums/GroupTypes';
import { StatusEnum } from '../../../app/enums/StatusTypes';
import { getOptionMui } from '../../../utils/getOption';

const groupTypesKeys = Object.keys(GroupTypes);

export const statusTypesKeys = Object.keys(StatusEnum);

const levelKeys = Object.keys(GroupLevels);

export const groupTypesOptions = Object.values(GroupTypes).map((el, index) =>
  getOptionMui(groupTypesKeys[index], el),
);

export const levelOptions = Object.values(GroupLevels).map((el, index) =>
  getOptionMui(levelKeys[index], el),
);
