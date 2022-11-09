import { RoleNames } from 'app/enums/RoleNames';
import { Roles } from 'app/enums/Roles';

export const convertEngRoleToRu = (roleCode: string) => {
  let role = '';
  switch (roleCode) {
    case Roles.Student:
      role = RoleNames.student;
      break;
    case Roles.Parent:
      role = RoleNames.parent;
      break;
    case Roles.Teacher:
      role = RoleNames.teacher;
      break;
    case Roles.TeacherEducation:
      role = RoleNames.teacherEducation;
      break;
    case Roles.Tutor:
      role = RoleNames.tutor;
      break;
    case Roles.Methodist:
      role = RoleNames.methodist;
      break;
    case Roles.Admin:
      role = RoleNames.admin;
      break;
    case Roles.FranchiseeAdmin:
      role = RoleNames.franchiseeAdmin;
      break;
    case Roles.Franchisee:
      role = RoleNames.franchisee;
      break;
    default:
      role = '-';
  }
  return role;
};
