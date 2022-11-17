import { Roles } from 'app/enums/Roles';

export const checkRoleForClasses = (role: Roles) => {
  switch (role) {
    case Roles.Admin:
    case Roles.Franchisee:
    case Roles.FranchiseeAdmin:
      return true;
    default:
      return false;
  }
  // return !!(role === Roles.Admin || Roles.FranchiseeAdmin || Roles.Franchisee);
};
