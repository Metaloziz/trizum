import { AppRoutes } from 'app/enums/AppRoutes';
import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';

import { KeepPlayingProps } from 'app/types/ComponentsProps';
import { GamePresetFromLoadme } from 'app/types/LoadMeTypes';

import classNames from 'classnames';
import KeepPlayingItem from 'components/keep-playing-item/KeepPlayingItem';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveClassGroup } from 'utils/getActiveClassGroup';

import styles from './KeepPlaying.module.scss';

const KeepPlaying: FC<KeepPlayingProps> = ({ className }) => {
  const navigate = useNavigate();

  const { getPreset, setActiveWork } = gamesStore;
  const { currentWork, user } = appStore;

  console.log('currentWork', currentWork);

  const gamePresets = currentWork?.work.gamePresets;

  const setRoute = async (game: GamePresetFromLoadme) => {
    const gameCode = game?.gamePreset?.game.code || '';

    await getPreset(gameCode);

    const group = getActiveClassGroup(user);

    setActiveWork({
      userGroupId: group?.id || '',
      workGamePresetId: game.id,
      courseWorkId: currentWork?.id || '', // todo
    });
    navigate(`${AppRoutes.Game}/${gameCode}`);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.title}>Список игр:</div>
      {!!gamePresets &&
        gamePresets.map(game => (
          <KeepPlayingItem
            key={game.id}
            title={game.gamePreset.game.name}
            onClick={() => setRoute(game)}
          />
        ))}
    </div>
  );
};

export default KeepPlaying;
