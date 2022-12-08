import coursesStore from 'app/stores/coursesStore';
import gamesStore from 'app/stores/gamesStore';
import { PlayResultForDisplayType } from 'app/types/PlayResultForDisplayType';
import { StatisticsItemProps } from 'app/types/StatisticsItemProps';
import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import { getRandomColor } from 'utils/getRandomColor';
import CardStudentForCheckHomeWork from '../../card-student/card-student-for-user/CardStudentForCheckHomeWork';
import Homework from '../../homework/Homework';
import StatisticsList from '../../olympiad-page/components/statistics-list/statistics-list/StatisticsList';
import styles from './OlympiadPage.module.scss';

export const CurrentHomeWork = observer(() => {
  const { currentHomework } = coursesStore;
  const { playResults } = gamesStore;

  const [convertPlayResult, setConvertPlayResult] = useState([new StatisticsItemProps()]);

  useEffect(() => {
    const draftPlayResult: PlayResultForDisplayType = {};

    playResults.items.forEach(result => {
      draftPlayResult[result.workGamePreset] = {
        id: result.id,
        colorTheme: getRandomColor(),
        gameTitle: result.gameCode,
        presetTitle: result.gamePreset,
        minutesLeft: (draftPlayResult[result.workGamePreset]?.minutesLeft ?? 0) + result.time,
        minutesTotal: result.timeMax,
        percentCompleted: 100,
      };
    });

    const newPlayResult = Object.keys(draftPlayResult).map(key => draftPlayResult[key]);

    setConvertPlayResult(newPlayResult);
  }, [playResults]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CardStudentForCheckHomeWork />
        <Homework title={currentHomework.work.title} text={currentHomework.work.text} />
      </div>
      <StatisticsList statisticsList={convertPlayResult} />
    </div>
  );
});
