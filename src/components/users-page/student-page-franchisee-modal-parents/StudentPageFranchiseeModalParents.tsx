import { Roles } from 'app/enums/Roles';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import styles from './StudentPageFranchiseeModalParents.module.scss';
import { StudentParentsFormContainer } from 'components/users-page/student-parrents-form-container/StudentParentsFormContainer';
import { ResponseOneUser } from 'app/types/UserTypes';

type StudentPageFranchiseeModalParentsPropsT = {
  onCloseModal: () => void;
  user?: ResponseOneUser;
};

const StudentPageFranchiseeModalParents: FC<StudentPageFranchiseeModalParentsPropsT> = observer(
  ({ user, onCloseModal }) => (
    <div className={styles.wrapper}>
      {user?.roleCode === Roles.Student && (
        <StudentParentsFormContainer
          franchiseId={user?.franchise?.id ? user.franchise.id : ''}
          studentId={user?.id ? user.id : ''}
          onCloseModal={onCloseModal}
          parents={user?.parents}
          isViewMode
        />
      )}
    </div>
  ),
);

export default StudentPageFranchiseeModalParents;
