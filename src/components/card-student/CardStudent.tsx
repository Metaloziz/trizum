import app from 'App';
import { StudentMain } from 'components/pupil-main/StudentMain';
import React, { FC } from 'react';

import appStore, { EmptyUser, Roles } from 'app/stores/appStore';
import { ResponseLoadMeBaseT } from 'app/types/ResponseLoadMeBaseT';
import CardStudentForTeacher from 'components/card-student/card-student-for-teacher/CardStudentForTeacher';
import CardStudentForStudent from 'components/card-student/card-student-for-user/CardStudentForStudent';

interface Props {
  user: EmptyUser;
}

const CardStudent: FC<Props> = props => {
  const { user } = props;
  switch (user.role) {
    case Roles.Student:
      return <CardStudentForStudent user={user} />;
    default:
      return <CardStudentForTeacher user={user} />;
  }
  // return (
  //   <>
  //     {user.role === Roles.Student && <CardStudentForStudent user={user} />}
  //     {user.role === Roles.Teacher && <CardStudentForTeacher user={user} />}
  //     {/* {type === 'extended' && <CardStudentExtended title={title} />} */}
  //   </>
  // );
};

export default CardStudent;
