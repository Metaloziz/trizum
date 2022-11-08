import { Roles } from 'app/enums/Roles';

export const isStudentRole = (selectedRole: Roles | undefined) => selectedRole === Roles.Student;
