import { Roles } from 'app/stores/appStore';
import { OptionT } from 'app/types/OptionT';

export const filterRoleOptions = (roleOptions: OptionT[], role: string) => {
  if (role === Roles.Franchisee) {
    return roleOptions.filter(
      el =>
        el.value !== Roles.Methodist && el.value !== Roles.Tutor && el.value !== Roles.Franchisee,
    );
  }
  if (role === Roles.FranchiseeAdmin) {
    return roleOptions.filter(
      el =>
        el.value !== Roles.Methodist &&
        el.value !== Roles.Tutor &&
        el.value !== Roles.Franchisee &&
        el.value !== Roles.FranchiseeAdmin,
    );
  }
  return roleOptions;
};
