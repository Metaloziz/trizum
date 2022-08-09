import React, { FC } from 'react';

import styles from './CardStudentForTeacher.module.scss';

import { EmptyUser } from 'app/stores/appStore';
import iconFlag from 'assets/svgs/flag.svg';
import Button from 'components/button/Button';
import CardStudentTitle from 'components/card-student/card-student-title/CardStudentTitle';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import Avatar from 'public/img/avatarDefault.png';

interface Props {
  user: EmptyUser;
}

const CardStudentForTeacher: FC<Props> = props => {
  const { user } = props;

  const fullName = `${user.middleName} ${user.firstName} ${user.lastName}`.trim();
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image
            src={user.avatar?.path ? user.avatar.path : Avatar}
            width="170"
            height="170"
            alt="student"
          />
        </CustomImageWrapper>
        <div>
          <CardStudentTitle>{fullName}</CardStudentTitle>
          <div>
            <div className={styles.list}>
              <span>Город:</span>
              <span>{user.city || '-'}</span>
            </div>
            {/* <div className={styles.list}>
              <span>Дата рождения:</span>
              <span>{user.}</span>
            </div> */}
          </div>
          <div className={styles.btnBlock}>
            <Button>Посмотреть Д/З</Button>
            <Button>Статистика</Button>
          </div>
        </div>
      </div>
      <CustomImageWrapper className={styles.flag} variant="none">
        <Image src={iconFlag} width="33" height="33" alt="Flag" />
      </CustomImageWrapper>
    </div>
  );
};

export default CardStudentForTeacher;
