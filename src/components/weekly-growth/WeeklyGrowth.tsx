import { FC } from 'react';

import classNames from 'classnames';

import SkillGrow from './skill-grow/SkillGrow';
import styles from './WeeklyGrowth.module.scss';

import { WeeklyGrowthProps } from 'app/types/ComponentsProps';

const WeeklyGrowth: FC<WeeklyGrowthProps> = ({ className, records }) => (
  <div className={classNames(styles.container, className)}>
    <span className={styles.title}>Рост за неделю</span>
    <div className={styles.itemsContainer}>
      {records?.map(wg => (
        <SkillGrow key={`id:${wg.title}`} {...wg} />
      ))}
    </div>
  </div>
);

export default WeeklyGrowth;
