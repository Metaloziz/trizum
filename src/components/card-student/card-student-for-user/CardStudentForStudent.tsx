import React, { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';

import iconTablet from '../../../assets/svgs/icon-tablet.svg';
import iconParrot from '../../../assets/svgs/parrot.svg';

import styles from './CardStudentForUser.module.scss';
import { getNearestLessonDateHelper } from './getNearestLessonDateHelper/getNearestLessonDateHelper';

import appStore, { EmptyUser, Roles } from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import iconFlag from 'assets/svgs/icon-flag.svg';
import iconMonkey from 'assets/svgs/monkey.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import { getAvatarImage } from 'components/card-student/card-student-for-user/helper/getAvatarImage';
import { OlympiadPreviewText } from 'components/card-student/card-student-for-user/OlympiadPreviewText/OlympiadPreviewText';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import Setting from 'components/setting/Setting';
import { ButtonsGroup } from 'components/card-student/card-student-for-user/ButtonsGroup/ButtonsGroup';
import { getClosestLessonDate, now } from 'utils/getClosestLessonDate';

type Props = {
  isMainPage?: boolean;
};

const CardStudentForStudent: FC<Props> = observer(({ isMainPage = true }) => {
  const { user } = appStore;
  const { firstName, middleName, lastName, role, avatar, city, groups } = user;
  const { getFullUserName } = usersStore;
  const {
    firstName: teacherFirstName,
    middleName: teacherMiddleName,
    lastName: teacherLastName,
  } = user.groups[0].group.teacher;
  const lessonDate = getClosestLessonDate(user.groups[0].group.schedule, now);
  const lessonTime = lessonDate ? `${lessonDate.date} в ${lessonDate.from}` : 'нет занятий';

  const [showModal, setShowModal] = useState<boolean>(false);
  const fullName = `${firstName} ${middleName} ${lastName}`;

  // eslint-disable-next-line no-alert
  const openChatLink = () => alert('открывается ссылка на чат'); // todo заменить на настоящие ссылки

  return (
    <div className={`${styles.wrapper} ${isMainPage ? '' : styles.olympiadPage}`}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image src={getAvatarImage(avatar?.path)} width="170" height="170" alt="student" />
          <div className={styles.userSetting}>{isMainPage && <Setting />}</div>
        </CustomImageWrapper>
        <div>
          <h3 className={styles.title}>{fullName}</h3>
          <div className={styles.mt15}>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconMonkey} width="25" height="25" alt="icon monkey" />
                </span>
                Статус:
              </li>
              <li>{role === Roles.Student && 'Студент'}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconFlag} width="25" height="25" alt="flag" />
                </span>
                Город:
              </li>
              <li>{city}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconParrot} width="25" height="25" alt="parrot" />
                </span>
                Учитель:
              </li>
              <li>{`${teacherFirstName} ${teacherMiddleName} ${teacherLastName}`}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width="25" height="25" alt="icon tablet" />
                </span>
                Следующее занятие:
              </li>
              <li>{lessonTime}</li>
            </ul>
          </div>
        </div>
      </div>
      {isMainPage && (
        <ButtonsGroup openChatLink={openChatLink} openModal={() => setShowModal(true)} />
      )}
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadPreviewText />
      </BasicModal>
    </div>
  );
});

export default CardStudentForStudent;
