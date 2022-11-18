import { Roles } from 'app/enums/Roles';
import { EmptyUser } from 'app/stores/emptyUser';
import React, { FC } from 'react';

import CardStudentForTeacher from 'components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForStudent from 'components/card-student/card-student-for-user/CardStudentForStudent';

interface Props {
  user: EmptyUser;
}

const CardStudent: FC<Props> = props => {
  const { user } = props;
  switch (user.role) {
    case Roles.Student:
      return <CardStudentForStudent />;
    default:
      return <CardStudentForTeacher user={user} />;
  }
};

export default CardStudent;
