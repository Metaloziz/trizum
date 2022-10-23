import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { FC, useState, useEffect } from 'react';
import appStore, { Roles } from '../../../app/stores/appStore';
import teacherMainStore from '../../../app/stores/scheduleStore';
import { EditLessonPayload } from '../../../app/types/EditLessonPayload';
import iconSettings from '../../../assets/svgs/icon-settings.svg';
import BasicModal from '../../basic-modal/BasicModal';
import Image from '../../image/Image';
import styles from '../Schedule.module.scss';
import { ScheduleModal } from '../ScheduleModal/ScheduleModal';
import { EventProps } from '../types/EventProps';

export const CustomEvent: FC<EventProps> = observer(({ event }) => {
  const { role } = appStore;
  const { editLesson } = teacherMainStore;

  const [width, setWidth] = useState<number | undefined>(undefined);

  const [isOpenChange, setIsOpenChange] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  const openEditLessonModal = () => {
    setIsOpenChange(true);
  };

  const saveNewLesson = (data: EditLessonPayload) => {
    editLesson(data);
    setIsOpenChange(false);
  };

  return (
    <div className={styles.eventFlexWrapper}>
      <div className={styles.eventText}>
        {width && width > 700 ? (
          <div>
            <span>Класс: </span>
            {event.groupName}
          </div>
        ) : null}
        <div>
          <span>Урок: </span>
          {event.lesson}
        </div>
        {width && width > 700 ? (
          <div className={styles.eventTime}>
            <span>Время:</span>
            <span>
              {` ${moment(event.start).format('h:mm')} - ${moment(event.end).format('h:mm')}`}
            </span>
          </div>
        ) : null}
      </div>
      {role !== Roles.Teacher && (
        <div className={styles.eventIcons} onClick={openEditLessonModal}>
          <span>
            <Image src={iconSettings} width="16" height="16" alt="Settings" />
          </span>
        </div>
      )}

      <div>
        <BasicModal fullWidth visibility={isOpenChange} changeVisibility={setIsOpenChange}>
          <ScheduleModal event={event} onApply={saveNewLesson} />
        </BasicModal>
      </div>
    </div>
  );
});
