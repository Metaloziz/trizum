import { FC } from 'react';

import classNames from 'classnames';

import styles from './Homeworks.module.scss';

import appStore, { Roles } from 'app/stores/appStore';
import { HomeworksProps } from 'app/types/ComponentsProps';
import Homework from 'components/homework/Homework';
import Panel from 'components/panel/Panel';

const Homeworks: FC<HomeworksProps> = ({ homeworks, className }) => {
  const { role, currentWork, hwDate } = appStore;
  if (currentWork && hwDate) {
    return (
      <div className={classNames(styles.container, className)}>
        <Panel className={styles.panel}>Домашнее задание на {hwDate}</Panel>
        {role === Roles.TeacherEducation && (
          <Panel className={styles.panel}>Наименование олимпиады</Panel>
        )}
        {role === Roles.Tutor && <Panel className={styles.panel}>Наименование олимпиады</Panel>}
        {homeworks.map(homework => (
          <Homework className={styles.homework} key={Math.random()} {...homework} />
        ))}
      </div>
    );
  }
  return <>Нет домашки</>;
};

export default Homeworks;
