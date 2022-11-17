import { Roles } from 'app/enums/Roles';

import appStore from 'app/stores/appStore';
import { HomeworksProps } from 'app/types/ComponentsProps';

import classNames from 'classnames';
import Panel from 'components/panel/Panel';
import { FC } from 'react';

import styles from './Homeworks.module.scss';

const Homeworks: FC<HomeworksProps> = ({ className }) => {
  const { role, currentWork, hwDate } = appStore;
  if (currentWork && hwDate) {
    return (
      <div className={classNames(styles.container, className)}>
        <Panel className={styles.panel}>Домашнее задание на {hwDate}</Panel>
        {role === Roles.TeacherEducation && (
          <Panel className={styles.panel}>Наименование олимпиады</Panel>
        )}
        {role === Roles.Tutor && <Panel className={styles.panel}>Наименование олимпиады</Panel>}
        {/* {homeworks.map(homework => (
          <Homework className={styles.homework} key={Math.random()} {...homework} />
        ))} */}
        <div>
          <div className={styles.title}>{currentWork.work.title}</div>
          <div className={styles.text}>{currentWork.work.text}</div>
        </div>
      </div>
    );
  }
  return <>Нет домашки</>;
};

export default Homeworks;
