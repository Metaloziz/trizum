import { GroupLevels, GroupsLevelsValue } from 'app/enums/GroupLevels';
import { StatusEnum, StatusTypes } from 'app/enums/StatusTypes';
import { Option } from 'components/select-mui/CustomSelect';

export const STATUS_MENU: Option[] = [
  { value: StatusTypes.draft, label: StatusEnum.draft },
  { value: StatusTypes.active, label: StatusEnum.active },
  { value: StatusTypes.removal, label: StatusEnum.removal },
  { value: StatusTypes.archive, label: StatusEnum.archive },
];

export const GROUP_LEVEL_MENU: Option[] = [
  { value: GroupsLevelsValue.easy, label: GroupLevels.easy },
  { value: GroupsLevelsValue.medium, label: GroupLevels.medium },
  { value: GroupsLevelsValue.hard, label: GroupLevels.hard },
];
