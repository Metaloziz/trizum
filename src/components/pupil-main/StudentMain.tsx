import gamesStore from 'app/stores/gamesStore';
import { ResponseOneGroup } from 'app/types/GroupTypes';
import { Group } from 'app/types/LoadMeTypes';
import { GroupsDataT } from 'app/types/ResponseLoadMeBaseT';
import _ from 'lodash';
import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import appStore from 'app/stores/appStore';
import CardStudent from 'components/card-student/CardStudent';
import { games, homeworks } from 'components/pupil-main/consts/consts';
import WeeklyGrowth from 'components/weekly-growth/WeeklyGrowth';
import Homeworks from 'containers/homeworks/Homeworks';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import styles from 'pages/home/Home.module.scss';
import { getGameForStudent } from 'utils/getGameForStudent';
import { personalRecordsArr } from 'utils/personalRecordsArr';

export const StudentMain: FC = observer(() => {
  const { user } = appStore;
  const { works } = appStore.user?.groups[0]?.group?.course || [];
  const recordsArr = personalRecordsArr(user.personalRecord);
  const actualGames = getGameForStudent(user.groups);

  return (
    <main className={styles.main}>
      <CardStudent user={user} />
      <WeeklyGrowth records={recordsArr} className={styles.weeklyGrowth} />
      <Homeworks className={styles.homeworks} homeworks={homeworks} />
      <KeepPlaying
        actualGames={actualGames}
        className={styles.keepPlaying}
        works={works}
        games={games}
      />
    </main>
  );
});
