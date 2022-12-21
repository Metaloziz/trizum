import { Roles } from 'app/enums/Roles';

export const isMethodistTutor = (role: Roles | undefined) =>
  role === Roles.Methodist ||
  role === Roles.Admin ||
  role === Roles.Tutor ||
  role === Roles.Student;
