import { FC } from 'react';

import classNames from 'classnames';

import styles from './KeepPlaying.module.scss';

import { KeepPlayingItemProps, KeepPlayingProps } from 'app/types/ComponentsProps';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';
import gamesStore from 'app/stores/gamesStore';

const KeepPlaying: FC<KeepPlayingProps> = ({ className, games, works, actualGames }) => {
  const navigate = useNavigate();

  const setRoute = async (gameUrl: string) => {
    await gamesStore.getPreset(gameUrl);

    navigate(`${AppRoutes.Game}/${gameUrl}`);
  };
  const gamesForShow: KeepPlayingItemProps[] = [];
  if (actualGames && actualGames.length) {
    for (let i = 0; i < actualGames.length; i++) {
      const found = games.find(el => el.code === actualGames[i].gameCode);
      found && gamesForShow.push(found);
    }
  }
  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Осталось времени</div>
      {!!gamesForShow.length &&
        gamesForShow.map(game => (
          <KeepPlayingItem
            key={Math.random()}
            {...game}
            onClick={() => setRoute(game?.code || '')}
          />
        ))}
    </div>
  );
};

export default KeepPlaying;
