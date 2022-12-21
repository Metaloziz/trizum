import { StatisticsItemProps } from 'app/types/StatisticsItemProps';
import { FC } from 'react';

import cn from 'classnames';

import styles from './StatisticsList.module.scss';
import StatisticsItem from './statistics-item/StatisticsItem';

type StatisticsListProps = {
  className?: string;
  statisticsList: StatisticsItemProps[];
};

const StatisticsList: FC<StatisticsListProps> = ({ className, statisticsList }) => (
  <div className={cn(styles.containerChoice, className)}>
    {statisticsList.length === 0 ? (
      <h2>нету данных</h2>
    ) : (
      statisticsList.map(
        ({
          percentCompleted,
          id,
          minutesLeft,
          colorTheme,
          gameTitle,
          minutesTotal,
          presetTitle,
        }) => (
          <StatisticsItem
            gameTitle={gameTitle}
            colorTheme={colorTheme}
            percentCompleted={percentCompleted}
            minutesLeft={minutesLeft}
            minutesTotal={minutesTotal}
            presetTitle={presetTitle}
            key={id}
            id={id}
          />
        ),
      )
    )}
  </div>
);

export default StatisticsList;
