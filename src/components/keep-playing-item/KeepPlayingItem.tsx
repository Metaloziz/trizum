import classNames from 'classnames';
import ButtonPlay from 'components/button-play/ButtonPlay';
import { FC } from 'react';

import styles from './KeepPlayingItem.module.scss';

type Props = {
  title: string;
  onClick: () => void;
  colorTheme?: string;
};

const KeepPlayingItem: FC<Props> = ({ title, colorTheme, onClick }) => (
  <div className={classNames(styles.container, styles[colorTheme || ''])}>
    <span className={styles.title}>{title}</span>
    <ButtonPlay size="small" onClick={onClick} />

    {/* скрыто до востребования */}
    {/* <span className={styles.minutesLeft}> */}
    {/*  {`${minutesLeft} / `} */}
    {/*  <span>50</span> */}
    {/*  <span>минут</span> */}
    {/* </span> */}
  </div>
);

export default KeepPlayingItem;
