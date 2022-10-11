import { FC } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import CardStudent from 'components/card-student/CardStudent';
import { games, homeworks, weeklyGrowth } from 'components/pupil-main/consts/consts';
import WeeklyGrowth from 'components/weekly-growth/WeeklyGrowth';
import Homeworks from 'containers/homeworks/Homeworks';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import styles from 'pages/home/Home.module.scss';

export const StudentMain: FC = observer(() => {
  const { user } = appStore;

  console.log(user);
  return (
    <main className={styles.main}>
      <CardStudent user={user} />
      <WeeklyGrowth className={styles.weeklyGrowth} weeklyGrowth={weeklyGrowth} />
      <Homeworks className={styles.homeworks} homeworks={homeworks} />
      <KeepPlaying
        className={styles.keepPlaying}
        works={user.groups[0].group.course.works}
        games={games}
      />
    </main>
  );
});
