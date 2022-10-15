import { FC } from 'react';

import classNames from 'classnames';

import styles from './KeepPlaying.module.scss';

import { KeepPlayingProps } from 'app/types/ComponentsProps';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';

const KeepPlaying: FC<KeepPlayingProps> = ({ className, games, works, actualGames }) => {
  const navigate = useNavigate();

  const setRout = (gameUrl: string) => () => navigate(`${AppRoutes.Game}/${gameUrl}`);
  let gameForShow;

  if (actualGames) {
    for (let i = 0; i < actualGames?.length; i++) {
      if (actualGames) {
        gameForShow = games.filter(el => el.code === actualGames[i]?.gameCode);
      }
    }
  }
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Осталось времени</div>
      {gameForShow &&
        gameForShow.map(game => (
          <KeepPlayingItem key={Math.random()} {...game} onClick={setRout(game?.code || '')} />
        ))}
    </div>
  );
};

export default KeepPlaying;
