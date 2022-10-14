import _ from 'lodash';
import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import CardStudent from 'components/card-student/CardStudent';
import { games, homeworks } from 'components/pupil-main/consts/consts';
import WeeklyGrowth from 'components/weekly-growth/WeeklyGrowth';
import Homeworks from 'containers/homeworks/Homeworks';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import styles from 'pages/home/Home.module.scss';
import { personalRecordsArr } from 'utils/personalRecordsArr';

export const StudentMain: FC = observer(() => {
  const { user } = appStore;
  // console.log(user);
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { works } = appStore.user?.groups[0]?.group?.course || [];
  console.log(_.cloneDeep(works), 'works::work');
  const presets = (works && works[0]?.work?.gamePresets) || [];
  console.log(_.cloneDeep(presets), 'preset::preset');
  const recordsArr = personalRecordsArr(user.personalRecord);

  return (
    <main className={styles.main}>
      <CardStudent user={user} />
      <WeeklyGrowth records={recordsArr} className={styles.weeklyGrowth} />
      <Homeworks className={styles.homeworks} homeworks={homeworks} />
      <KeepPlaying className={styles.keepPlaying} works={works} games={games} />
    </main>
  );
});
