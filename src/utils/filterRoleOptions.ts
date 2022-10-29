import { Roles } from 'app/stores/appStore';
import { OptionT } from 'app/types/OptionT';

export const filterRoleOptions = (roleOptions: OptionT[], role: string) => {
  switch (role) {
    case Roles.Franchisee:
      return roleOptions.filter(
        el =>
          el.value !== Roles.Methodist && el.value !== Roles.Tutor && el.value !== Roles.Franchisee,
      );

    case Roles.FranchiseeAdmin:
      return roleOptions.filter(
        el =>
          el.value !== Roles.Methodist &&
          el.value !== Roles.Tutor &&
          el.value !== Roles.Franchisee &&
          el.value !== Roles.TeacherEducation &&
          el.value !== Roles.FranchiseeAdmin,
      );
    case Roles.Tutor:
      return roleOptions.filter(
        el =>
          el.value !== Roles.Methodist &&
          el.value !== Roles.Tutor &&
          el.value !== Roles.Student &&
          el.value !== Roles.Admin &&
          el.value !== Roles.Parent &&
          el.value !== Roles.Teacher &&
          el.value !== Roles.TeacherEducation,
      );
    default:
      return roleOptions;
  }
};
