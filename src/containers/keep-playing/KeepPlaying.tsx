import { FC } from 'react';

import classNames from 'classnames';

import styles from './KeepPlaying.module.scss';

import { KeepPlayingProps } from 'app/types/ComponentsProps';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';

const KeepPlaying: FC<KeepPlayingProps> = ({ className, games, works }) => {
  const navigate = useNavigate();

  const setRout = (gameUrl: string) => () => navigate(`${AppRoutes.Game}/${gameUrl}`);

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Осталось времени</div>
      {games.map(game => (
        <KeepPlayingItem key={Math.random()} {...game} onClick={setRout(game?.code || '')} />
      ))}
    </div>
  );
};

export default KeepPlaying;
