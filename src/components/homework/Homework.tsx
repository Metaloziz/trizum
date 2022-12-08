import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';
import { FC } from 'react';

import classNames from 'classnames';

import styles from './Homework.module.scss';

type Props = Pick<HomeworkViewModel, 'title' | 'text'>;

const Homework: FC<Props> = ({ title, text }) => (
  <div className={classNames(styles.container)}>
    <h3 className={classNames('h3', styles.gameTitle)}>{title}</h3>
    <div className={styles.description}>{text}</div>
  </div>
);

export default Homework;
