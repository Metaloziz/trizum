import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import { ScheduleT } from 'app/types/ScheduleT';
import iconFlag from 'assets/svgs/icon-flag.svg';
import iconMonkey from 'assets/svgs/monkey.svg';
import BasicModal from 'components/basic-modal/BasicModal';
import { getAvatarImage } from 'components/card-student/card-student-for-user/helper/getAvatarImage';
import { OlympiadPreviewText } from 'components/card-student/card-student-for-user/OlympiadPreviewText/OlympiadPreviewText';
import CustomImageWrapper from 'components/custom-image-wrapper/CustomImageWrapper';
import Image from 'components/image/Image';
import Setting from 'components/setting/Setting';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useState } from 'react';
import { dateNow } from 'utils/dateNow';
import { getActiveClassGroup } from 'utils/getActiveClassGroup';
import { getNearestLessonObject } from 'utils/getNearestLessonObject/getNearestLessonObject';

import iconTablet from '../../../assets/svgs/icon-tablet.svg';
import iconParrot from '../../../assets/svgs/parrot.svg';

import styles from './CardStudentForUser.module.scss';

const CardStudentForStudent: FC = observer(() => {
  const { user, teacherName, fullUserName, getSchedule } = appStore;

  const { role, avatar, city } = user;

  const [lessonDate, setLessonDate] = useState<ScheduleT>();
  const [showModal, setShowModal] = useState(false);

  const group = getActiveClassGroup(user);

  console.log('getSchedule', toJS(getSchedule));

  useEffect(() => {
    const currentLessonDate = getNearestLessonObject(getSchedule, dateNow());
    if (currentLessonDate) {
      setLessonDate(currentLessonDate);
    }
  }, []);

  const lessonTime = lessonDate ? `${lessonDate.date} в ${lessonDate.from}` : 'нет занятий';

  // eslint-disable-next-line no-alert
  const openChatLink = () => alert('открывается ссылка на чат'); // todo заменить на настоящие ссылки

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <CustomImageWrapper className={styles.image} variant="circle">
          <Image src={getAvatarImage(avatar?.path)} width="170" height="170" alt="student" />
          <div className={styles.userSetting}>
            <Setting />
          </div>
        </CustomImageWrapper>

        <div>
          <h3 className={styles.title}>{fullUserName}</h3>
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
                <p>Учитель:</p>
              </li>
              <li>{teacherName}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width="25" height="25" alt="icon tablet" />
                </span>
                <p>Следующее занятие:</p>
              </li>
              <li>{lessonTime}</li>
            </ul>
            <ul className={styles.list}>
              <li>
                <span>
                  <Image src={iconTablet} width="25" height="25" alt="icon tablet" />
                </span>
                <p>Класс:</p>
              </li>
              <li>{group?.group.name}</li>
            </ul>
          </div>
        </div>
      </div>
      {/* {isMainPage && ( */}
      {/*  <ButtonsGroup openChatLink={openChatLink} openModal={() => setShowModal(true)} /> */}
      {/* )} */}
      <BasicModal visibility={showModal} changeVisibility={setShowModal}>
        <OlympiadPreviewText />
      </BasicModal>
    </div>
  );
});

export default CardStudentForStudent;
