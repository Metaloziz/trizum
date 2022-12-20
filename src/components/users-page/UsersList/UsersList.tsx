import usersStore from 'app/stores/usersStore';
import { ResponseUserT } from 'app/types/UserTypes';
import CardStudentExtended from 'components/card-student/card-student-extended/CardStudentExtended';
import styles from 'components/users-page/UsersPage.module.scss';
import React, { FC } from 'react';

export type UsersListPropsType = {
  getOneUser: typeof usersStore.getOneUser;
  users: ResponseUserT[];
};

export const UsersList: FC<UsersListPropsType> = ({ users, getOneUser }) => (
  <div className={styles.cardWrapper}>
    {users?.length ? (
      users.map(user => <CardStudentExtended getOneUser={getOneUser} key={user.id} user={user} />)
    ) : (
      <div className={styles.emptyTitle}>нет пользователей</div>
    )}
  </div>
);
