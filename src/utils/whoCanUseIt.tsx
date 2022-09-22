import appStore, { Roles } from 'app/stores/appStore';

export const whoCanUseIt = (roles: Roles[]) => {
  const { role } = appStore;

  return roles.includes(role);
};
