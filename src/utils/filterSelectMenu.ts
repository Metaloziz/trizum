import { StatusTypes } from 'app/enums/StatusTypes';
import { Option } from 'components/select-mui/CustomSelect';

export const filterSelectMenu = (status: StatusTypes, menu: Option[]) => {
  const index = menu.findIndex(({ value }) => value === status);
  return menu.slice(index);
};
