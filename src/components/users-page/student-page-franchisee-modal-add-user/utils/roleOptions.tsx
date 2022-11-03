import { RoleNames } from 'app/enums/RoleNames';
import { Roles } from 'app/stores/appStore';

export const roleOptions = [
  { label: RoleNames.student, value: Roles.Student },
  // { label: RoleNames.parent, value: Roles.Parent },
  { label: RoleNames.teacherEducation, value: Roles.TeacherEducation },
  { label: RoleNames.teacher, value: Roles.Teacher },
  { label: RoleNames.franchiseeAdmin, value: Roles.FranchiseeAdmin },
  { label: RoleNames.franchisee, value: Roles.Franchisee },
  { label: RoleNames.tutor, value: Roles.Tutor },
  { label: RoleNames.methodist, value: Roles.Methodist },
  // { label: RoleNames.admin, value: Roles.Admin }, disable
];
