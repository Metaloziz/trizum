import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';

export const whoCanUseIt = (roles: Roles[]) => {
  const { role } = appStore;

  return roles.includes(role);
};
