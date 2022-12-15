import React from 'react';

import styles from './CheckingHomework.module.scss';

import ChoiceInfoList from 'components/checking-homework/choice-info/choice-info-list/ChoiceInfoList';
import { games, homeworks } from 'components/pupil-main/consts/consts';
import Homeworks from 'containers/homeworks/Homeworks';

const CheckingHomework = () => (
  <div className={styles.mainContainer}>
    <div className={styles.firstContainer}>
      {/* <CardStudent title="Днепровский Александр Алексеевич" type="student" /> */}
      <Homeworks className={styles.homeworksChecking} homeworks={homeworks} />
    </div>
    <div>{/* <ChoiceInfoList className={styles.keepPlaying} games={games} /> */}</div>
  </div>
);

export default CheckingHomework;
