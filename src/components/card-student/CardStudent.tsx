import React, { FC } from 'react';

import { Roles } from 'app/stores/appStore';
import { ResponseUserT } from 'app/types/UserTypes';
import CardStudentForTeacher from 'components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForStudent from 'components/card-student/card-student-for-user/CardStudentForStudent';

type UserType = 'student' | 'teacher' | 'extended';

interface Props {
  user: ResponseUserT;
}

// const mockStudent = {
//   fullName: 'string',
//   role: 'string',
//   city: 'string',
//   phone: 'string',
//   birthdate: 'string',
//   email: 'string',
// };

const CardStudent: FC<Props> = props => {
  const { user } = props;
  return (
    <>
      {Roles.Student === 'student' && <CardStudentForStudent user={user} />}
      {user.roleCode === 'teacher' && <CardStudentForTeacher user={user} />}
      {/* {type === 'extended' && <CardStudentExtended title={title} />} */}
    </>
  );
};

export default CardStudent;
