import { FC, useCallback, useState } from 'react';

import { observer } from 'mobx-react-lite';
import { convertEngRoleToRu } from 'utils/convertEngRoleToRu';

import styles from './Account.module.scss';

import tokenService from 'app/services/tokenService';
import appStore, { Roles } from 'app/stores/appStore';
import defaultAvatar from 'public/img/avatarDefault.png';
import { DropDownStudents } from 'components/drop-down-student/DropDownStudents';
import Image from 'components/image/Image';
import { BASE_URL } from 'constants/constants';

const Account: FC = observer(() => {
  const { user, setRole, isLoggedIn } = appStore;
  const [isOpenChangeStudentModal, setIsOpenChangeStudentModal] = useState<boolean>(false);

  const toggleChangeStudentModal = () => {
    user.canSwitchTo.length > 0 && setIsOpenChangeStudentModal(!isOpenChangeStudentModal);
  };

  const logout = async () => {
    await tokenService.removeUser();
    appStore.logout();
    setRole(Roles.Unauthorized);
  };

  const onChangeStudent = useCallback(async (id: string) => {
    try {
      await appStore.switchUser({ id });
    } catch (e) {
      console.warn(e);
    }
  }, []);

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <>
          <button onClick={toggleChangeStudentModal} className={styles.avatar}>
            <Image
              // src={`https://lk.trizum.ru${user?.avatar?.path}`}
              src={user?.avatar?.path ? `${BASE_URL}${user?.avatar?.path}` : defaultAvatar}
              style={{ borderRadius: '50%' }}
              width={53}
              height={53}
              alt="user avatar"
            />
            <div className={styles.notification} />
            {isOpenChangeStudentModal && (
              <DropDownStudents
                avatar={defaultAvatar}
                canSwitchTo={user.canSwitchTo}
                onChangeStudent={onChangeStudent}
              />
            )}
          </button>
          <span className={styles.span}>{convertEngRoleToRu(appStore.role)}</span>
          <button className={styles.logout} onClick={logout}>
            Выйти из аккаунта
          </button>
        </>
      ) : null}
    </div>
  );
});

export default Account;
