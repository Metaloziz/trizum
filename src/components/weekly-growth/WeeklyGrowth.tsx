import { FC } from 'react';

import classNames from 'classnames';

import SkillGrow from './skill-grow/SkillGrow';
import styles from './WeeklyGrowth.module.scss';

import { WeeklyGrowthProps } from 'app/types/ComponentsProps';

// const WeeklyGrowth: FC<WeeklyGrowthProps> = ({ weeklyGrowth, className, records }) => (
const WeeklyGrowth: FC<WeeklyGrowthProps> = ({ className, records }) => (
  <div className={classNames(styles.container, className)}>
    <span className={styles.title}>Рост за неделю</span>
    <div className={styles.itemsContainer}>
      {/* {weeklyGrowth.map(wg => ( */}
      {/*  <SkillGrow key={Math.random()} {...wg} /> */}
      {/* ))}  */}
      {records?.map(wg => (
        <SkillGrow key={wg.id} {...wg} />
      ))}
    </div>
  </div>
);

export default WeeklyGrowth;
