import { GroupStatus } from '../app/enums/GroupStatus';
import { getOptionMui } from '../utils/getOption';

export const statusGroupKeys = Object.keys(GroupStatus);

export const statusTypeOptions = Object.values(GroupStatus).map((el, index) =>
  getOptionMui(statusGroupKeys[index], el),
);
