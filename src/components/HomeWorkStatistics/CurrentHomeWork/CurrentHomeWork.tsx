import React from 'react';
import appStore from '../../../app/stores/appStore';
import CardStudentForStudent from '../../card-student/card-student-for-user/CardStudentForStudent';
import Homework from '../../homework/Homework';
import {
  StatisticsItemProps,
  colorThemeStatistic,
} from '../../olympiad-page/components/statistics-list/statistics-list/statistics-item/StatisticsItem';
import StatisticsList from '../../olympiad-page/components/statistics-list/statistics-list/StatisticsList';
import styles from './OlympiadPage.module.scss';

export const mock: StatisticsItemProps[] = [
  {
    id: 1,
    itemTitle: 'Игра по математике',
    minutesLeft: 10,
    minutesTotal: 50,
    percentCompleted: 50,
    colorTheme: colorThemeStatistic.blue,
  },
  {
    id: 2,
    itemTitle: 'Игра по физике',
    minutesLeft: 10,
    minutesTotal: 50,
    percentCompleted: 50,
    colorTheme: colorThemeStatistic.aquamarine,
  },
  {
    id: 3,
    itemTitle: 'Игра по биологии',
    minutesLeft: 10,
    minutesTotal: 50,
    percentCompleted: 50,
    colorTheme: colorThemeStatistic.gradientViolet,
  },
];

export const desc = {
  needToDo: 'нужно развить свои ментальные навыки',
  minutesLeft: 50,
  tips: [
    {
      text: 'cконцентрируйтесь и обратите взор внутрь себя, найдите своё место силы',
      id: +new Date().toDateString(),
    },
    {
      text: 'прочитай мысли своего соседа',
      id: +new Date().toDateString(),
    },
    {
      text: 'загляни в будущее',
      id: +new Date().toDateString(),
    },
  ],
};

export const CurrentHomeWork = () => {
  const { user } = appStore;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CardStudentForStudent isMainPage={false} />
        <Homework gameTitle="олимпиада по ментальной силе" description={desc} id={1} />
      </div>
      <StatisticsList statisticsList={mock} />
    </div>
  );
};
