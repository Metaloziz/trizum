import { EmptyUser } from 'app/stores/appStore';

import iconFlag from 'assets/svgs/flag.svg';
import Button from 'components/button/Button';
import CardStudentTitle from 'components/card-student/card-student-title/CardStudentTitle';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import { BASE_URL } from 'constants/constants';
import Avatar from 'public/img/avatarDefault.png';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRuBirthdayDate } from 'utils/getRuBirthdayDate';
import { AppRoutes } from '../../../app/enums/AppRoutes';

import styles from './CardStudentForTeacher.module.scss';

interface Props {
  user: EmptyUser;
}

const CardStudentForTeacher: FC<Props> = props => {
  const { user } = props;

  const navigate = useNavigate();

  const redirectToHomeWork = () => {
    navigate(`${AppRoutes.Classes}/${user.id}`);
  };

  const fullName = `${user.middleName} ${user.firstName} ${user.lastName}`.trim();
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image
            src={user.avatar?.path ? `${BASE_URL}${user?.avatar?.path}` : Avatar}
            width="170"
            height="170"
            alt="student"
          />
        </CustomImageWrapper>
        <div>
          <CardStudentTitle>{fullName}</CardStudentTitle>
          <div>
            <div className={styles.list}>
              <span>Статус:</span>
              <span>{user.role || 'Студент'}</span>
            </div>
            <div className={styles.list}>
              <span>Город:</span>
              <span>{user.city || '-'}</span>
            </div>
            <div className={styles.list}>
              <span>Телефон:</span>
              <span>{user.phone || '-'}</span>
            </div>
            <div className={styles.list}>
              <span>Дата рождения:</span>
              <span>{getRuBirthdayDate(user.birthdate.date)}</span>
            </div>
            <div className={styles.list}>
              <span> Почта:</span>
              <span>{user.email || '-'}</span>
            </div>
          </div>

          <div className={styles.btnBlock}>
            <Button onClick={redirectToHomeWork}>Посмотреть Д/З</Button>
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
