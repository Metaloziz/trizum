import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';

import { KeepPlayingProps } from 'app/types/ComponentsProps';

import classNames from 'classnames';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './KeepPlaying.module.scss';

const KeepPlaying: FC<KeepPlayingProps> = ({ className }) => {
  const navigate = useNavigate();

  const { getPreset } = gamesStore;
  const { currentWork } = appStore;

  const gamePresets = currentWork?.gamePresets;

  const setRoute = async (gameUrl: string) => {
    await getPreset(gameUrl);

    navigate(`${AppRoutes.Game}/${gameUrl}`);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Список игр:</div>
      {!!gamePresets &&
        gamePresets.map(game => (
          <KeepPlayingItem
            key={game.id}
            title={game.gamePreset.game.name}
            onClick={() => setRoute(game?.gamePreset?.game.code || '')}
          />
        ))}
    </div>
  );
};

export default KeepPlaying;
