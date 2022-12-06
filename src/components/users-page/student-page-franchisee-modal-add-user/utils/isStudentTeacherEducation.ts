import { Roles } from 'app/enums/Roles';

export const isStudentTeacherEducation = (role: Roles | undefined) => role === Roles.Student;
