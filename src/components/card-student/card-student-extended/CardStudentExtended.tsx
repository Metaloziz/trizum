import { Roles } from 'app/stores/appStore';
import { ResponseOneUser, ResponseUserT } from 'app/types/UserTypes';
import Button from 'components/button/Button';
import { EditUserIcon } from 'components/card-student/card-student-extended/edit-user-icon/EditUserIcon';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import { BASE_URL } from 'constants/constants';
import mockAvatar from 'public/img/avatarDefault.png';
import React, { FC } from 'react';
import { convertEngRoleToRu } from 'utils/convertEngRoleToRu';
import { getFullUserName } from 'utils/getFullUserName';

import modals from '../../../app/stores/CardStudentExtended';

import styles from './CardStudentExtended.module.scss';

type Props = {
  user: ResponseUserT;
  getOneUser: (id: string) => Promise<ResponseOneUser | undefined>;
};

const CardStudentExtended: FC<Props> = ({
  user: {
    email,
    phone,
    id,
    firstName,
    lastName,
    middleName,
    city,
    avatar,
    groups,
    roleCode,
    franchise,
    active,
  },
  getOneUser,
}) => {
  const FULL_NAME = getFullUserName(lastName, firstName, middleName);

  const role = convertEngRoleToRu(roleCode);

  const onEditUserClick = async () => {
    try {
      await getOneUser(id);
      modals.changeSetting();
    } catch (e) {
      console.warn(e);
    }
  };

  const setCurrentUserData = async () => {
    await getOneUser(id);
    modals.changeParents();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.rowWrapper}>
        <div className={styles.row}>
          <CustomImageWrapper className={styles.image} variant="circle">
            <Image
              src={avatar ? `${BASE_URL}${avatar.path}` : mockAvatar}
              width="170"
              height="170"
              alt="avatar"
            />
          </CustomImageWrapper>
          <div className={styles.title}>
            <h3>{FULL_NAME}</h3>
            <div className={styles.mt20}>
              <p className={styles.list}>
                Статус: <span>{role}</span>
              </p>
              {city && (
                <p className={styles.list}>
                  Город: <span>{city}</span>
                </p>
              )}
              {phone && roleCode !== Roles.Student && (
                <p className={styles.list}>
                  Телефон: <span>{phone}</span>
                </p>
              )}
              {email && roleCode !== Roles.Student && (
                <p className={styles.list}>
                  Почта: <span>{email}</span>
                </p>
              )}
              {!!groups.length && roleCode === Roles.Student && (
                <p className={styles.list}>
                  Группа: <span>{groups[0].groupName}</span>
                </p>
              )}
              {franchise && roleCode === Roles.Student && (
                <p className={styles.list}>
                  Франшиза: <span>{franchise.shortName}</span>
                </p>
              )}
              {/* <p className={styles.list}> */}
              {/*  Дата рождения: <span>{birthdate && birthdate.date}</span> */}
              {/* </p> */}
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          {roleCode === Roles.Student && (
            <Button variant="parents" size="small" onClick={setCurrentUserData}>
              Родители
            </Button>
          )}
        </div>
      </div>
      <EditUserIcon onClick={onEditUserClick} />
    </div>
  );
};

export default CardStudentExtended;
