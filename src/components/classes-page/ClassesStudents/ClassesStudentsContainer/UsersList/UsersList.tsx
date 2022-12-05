import { Alert } from '@mui/material';
import { UserGroupStatus } from 'app/enums/UserGroupStatus';
import { UsersDataT } from 'app/types/GroupTypes';
import CardStudentForTeacher from 'components/card-student/card-student-for-teacher/CardStudentForTeacher';
import styles from 'components/classes-page/ClassesMainPage.module.scss';
import React, { FC } from 'react';

export type Props = {
  users: UsersDataT[];
  setSelectedUserId?: (userId: string) => void;
};
export const UsersList: FC<Props> = ({ users, setSelectedUserId }) => {
  const activeUser = users.filter(user => user.status === UserGroupStatus.active);
  const isShowStudentList = !!activeUser?.length;

  return (
    <div className={styles.blockCardStudents}>
      {isShowStudentList ? (
        <>
          {activeUser.map(user => (
            <CardStudentForTeacher
              key={user.id}
              user={user.user}
              setSelectedUserId={setSelectedUserId}
            />
          ))}
        </>
      ) : (
        <Alert severity="info">
          <h2>нету студентов</h2>
        </Alert>
      )}
    </div>
  );
};
