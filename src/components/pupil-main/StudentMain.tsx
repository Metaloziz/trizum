import appStore from 'app/stores/appStore';
import CardStudent from 'components/card-student/CardStudent';
import { games } from 'components/pupil-main/consts/consts';
import { HomeWorksList } from 'components/pupil-main/HomeWorksList/HomeWorksList';
import WeeklyGrowth from 'components/weekly-growth/WeeklyGrowth';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import { toJS } from 'mobx';

import { observer } from 'mobx-react-lite';
import styles from 'pages/home/Home.module.scss';
import { FC } from 'react';
import { personalRecordsArr } from 'utils/personalRecordsArr';

export const StudentMain: FC = observer(() => {
  const { user, currentGameIds } = appStore;
  const { works } = user?.groups[0]?.group?.course || [];
  const { schedule } = user?.groups[0]?.group || [];
  const recordsArr = personalRecordsArr(user.personalRecord);

  console.log('currentGameIds', toJS(currentGameIds));
  console.log('works', toJS(works));
  console.log('user', toJS(user));

  return (
    <main className={styles.main}>
      <div className={styles.rowInfo}>
        <CardStudent user={user} />
        <WeeklyGrowth records={recordsArr} className={styles.weeklyGrowth} />
      </div>
      <div className={styles.rowHw}>
        <HomeWorksList works={works} schedule={schedule} />
        <KeepPlaying
          actualGames={currentGameIds}
          className={styles.keepPlaying}
          works={works}
          games={games}
        />
      </div>
    </main>
  );
});
