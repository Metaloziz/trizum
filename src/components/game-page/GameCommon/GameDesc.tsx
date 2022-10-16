import styles from 'pages/game/Game.module.scss';
import React, { FC } from 'react';

type PropsT = {
  started: boolean;
  gameTitle: string;
  presetDesc: string | undefined;
};

export const GameDesc: FC<PropsT> = ({ started, gameTitle, presetDesc }) => (
  <div className={styles.wrapGameBlock_footer}>
    <span className={styles.wrapGameBlock_footer_title}>{gameTitle}</span>
    <span className={styles.wrapGameBlock_footer_desc}>{presetDesc}</span>
  </div>
);
