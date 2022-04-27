import React, { FC } from 'react';
import CardStudentForTeacher from '@components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForUser from '@components/card-student/card-student-for-user/CardStudentForUser';
import CardStudentExtended from './card-student-extended/CardStudentExtended';
type UserType = 'student' | 'teacher' | 'extended';

interface Props {
  title: string;
  type: UserType;
}

const CardStudent: FC<Props> = ({ title, type }) => {
  return (
    <>
      {type === 'student' && <CardStudentForUser title={title} />}
      {type === 'teacher' && (
        <CardStudentForTeacher title={title} flag={true} />
      )}
      {type === 'extended' && <CardStudentExtended title={title} />}
    </>
  );
};

export default CardStudent;
