import { StatusTypes } from 'app/enums/StatusTypes';
import appStore from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import CardStudent from 'components/card-student/CardStudent';
import { games } from 'components/pupil-main/consts/consts';
import { getWorksAndSchedule } from 'components/pupil-main/getWorksAndSchedule/getWorksAndSchedule';
import { HomeWorksList } from 'components/pupil-main/HomeWorksList/HomeWorksList';
import WeeklyGrowth from 'components/weekly-growth/WeeklyGrowth';
import KeepPlaying from 'containers/keep-playing/KeepPlaying';
import { toJS } from 'mobx';

import { observer } from 'mobx-react-lite';
import styles from 'pages/home/Home.module.scss';
import { FC, useEffect } from 'react';
import { personalRecordsArr } from 'utils/personalRecordsArr';

export const StudentMain: FC = observer(() => {
  const { user, currentGameIds, setGameIdsWithCodesByHomeWorkIndex } = appStore;
  const { getOlympiadGroups } = groupStore;
  const { works, schedule } = getWorksAndSchedule(user.groups);

  const recordsArr = personalRecordsArr(user.personalRecord);

  console.log('currentGameIds', toJS(currentGameIds));
  console.log('works', toJS(works));
  console.log('schedule', toJS(schedule));
  console.log('user', toJS(user));

  useEffect(() => {
    getOlympiadGroups({ perPage: 100, type: 'olympiad', status: StatusTypes.active });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.rowInfo}>
        <CardStudent user={user} />
        <WeeklyGrowth records={recordsArr} className={styles.weeklyGrowth} />
      </div>
      <div className={styles.rowHw}>
        <HomeWorksList
          works={works}
          schedule={schedule}
          setGameIdsWithCodes2={setGameIdsWithCodesByHomeWorkIndex}
        />
        <KeepPlaying actualGames={currentGameIds} className={styles.keepPlaying} games={games} />
      </div>
    </main>
  );
});
