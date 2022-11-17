import { Roles } from 'app/enums/Roles';
import usersStore from 'app/stores/usersStore';
import iconFlag from 'assets/svgs/icon-flag.svg';
import iconMonkey from 'assets/svgs/monkey.svg';
import { getAvatarImage } from 'components/card-student/card-student-for-user/helper/getAvatarImage';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SecondaryRoutes } from 'app/enums/SecondaryRoutes';

import iconTablet from '../../../assets/svgs/icon-tablet.svg';
import iconParrot from '../../../assets/svgs/parrot.svg';

import styles from './CardStudentForUser.module.scss';

const CardStudentForCheckHomeWork: FC = observer(() => {
  const {
    currentUser,
    getFullUserName,
    getAllDataForHomeWorkStudentPage,
    teacherName,
    theNextLessonDate,
    resetCurrentUser,
  } = usersStore;

  const studentId = useParams()[SecondaryRoutes.StudentId];

  useEffect(() => {
    if (studentId) {
      getAllDataForHomeWorkStudentPage(studentId);
    }
    return resetCurrentUser;
  }, [studentId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image
            src={getAvatarImage(currentUser?.avatar?.path)}
            width="170"
            height="170"
            alt="student"
          />
        </CustomImageWrapper>
        <div>
          <h3 className={styles.title}>{getFullUserName}</h3>
          <div className={styles.mt15}>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconMonkey} width="25" height="25" alt="icon monkey" />
                </span>
                Статус:
              </li>
              <li>{currentUser?.roleCode === Roles.Student && 'Студент'}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconFlag} width="25" height="25" alt="flag" />
                </span>
                Город:
              </li>
              <li>{currentUser?.city}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconParrot} width="25" height="25" alt="parrot" />
                </span>
                Учитель:
              </li>
              <li>{teacherName}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width="25" height="25" alt="icon tablet" />
                </span>
                Следующее занятие:
              </li>
              <li>{theNextLessonDate}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CardStudentForCheckHomeWork;
