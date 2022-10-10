import React, { FC } from 'react';
import { OneGamePresent } from '../../../../app/types/GameTypes';
import style from './ErrorMessage.module.scss';

type Props = {
  gamePreset: OneGamePresent;
};
export const ErrorMessage: FC<Props> = ({ gamePreset }) => {
  const result = typeof gamePreset === 'undefined';

  return <div className={style.container}> {result ? 'Эта настройка игры не работает' : ''}</div>;
};
