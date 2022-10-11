import { FC } from 'react';

import classNames from 'classnames';
import { PersonalRecordsArrT } from 'utils/personalRecordsArr';

import styles from './SkillGrow.module.scss';

import { SkillGrowProps } from 'app/types/ComponentsProps';

// const SkillGrow: FC<SkillGrowProps> = ({ skillTitle, color, percents }) => {
const SkillGrow: FC<PersonalRecordsArrT> = ({ title, color, value }) => {
  const indicatorStyle = {
    height: `${1.8 * value}px`,
  };

  return (
    <div className={styles.container}>
      {/* @ts-ignore */}
      <div className={classNames(styles.indicator, styles[color])} style={indicatorStyle} />
      <span className={styles.percents}>{`${value}%`}</span>
      <span className={styles.skillTitle}>{title}</span>
    </div>
  );
};

export default SkillGrow;
