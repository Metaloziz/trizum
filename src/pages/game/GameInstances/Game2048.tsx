import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { observer } from 'mobx-react-lite';
import React, { FC, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import styles from '../Game.module.scss';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';
import gamesStore from 'app/stores/gamesStore';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { useNavigate } from 'react-router-dom';
import Button from 'components/button/Button';
import appStore, { Roles } from 'app/stores/appStore';
import InformationItem from 'components/information-item/InformationItem';
import { Option } from 'components/select-mui/CustomSelect';

type Game2048PropsT = {
  actualPresets?: Option[];
};
const Game2048: FC<Game2048PropsT> = observer(({ actualPresets }) => {
  const gameName = GameIdentifiers.game2048;
  const GameInstance = Factory(gameName);
  const { gamePreset, deletePreset } = gamesStore;
  const { role } = appStore;
  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gameTitle = '2048';

  const params = {
    size: 4,
    startTiles: 2,
  }; // Уникальные параметры для конкретной игры
  let ref: any = null;

  const onRef = (refGame: any) => {
    ref = refGame;
  };

  const startGame = () => {
    setStarted(true);
    ref?.start();
  };

  const onEnd = (result: any) => {
    // Пример использования результатов игры
    const message = [`Ваше время: ${result.time} секунд`];
    if (result?.timeDiff) {
      message.push(`Среднее время: ${result.timeDiff} секунд`);
    }
    if (result?.score) {
      message.push(`Ваш результат: ${result.score}`);
    }
    if (result?.success) {
      message.push(`Правильных ответов: ${result.success}`);
    }
    if (result?.failed) {
      message.push(`Допущено ошибок: ${result.failed}`);
    }
    /* eslint-disable no-alert */
    alert(message.join('\n'));
  };

  const navigate = useNavigate();

  const settings = gamePreset.gamePreset.settings[0];
  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);

  const setPreset = (data: Option) => {
    gamesStore.getPreset(data.value);
  };

  const toggleModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  return (
    <>
      {(role === Roles.Methodist || role === Roles.Admin) && (
        <GameModal open={isModalOpen} onClose={toggleModal} deletePreset={deletePreset} />
      )}
      <div className={styles.wrapGameBlock} key={gameTitle}>
        <section>
          <div style={{ minWidth: `${gameViewSize + 100}px` }}>
            <Button onClick={() => navigate(-1)}>Назад</Button>
            {(role === Roles.Methodist || role === Roles.Admin) && (
              <div className={styles.wrapGameBlock_header}>
                <div className={styles.wrapGameBlock_header_select}>
                  <InformationItem
                    variant="select"
                    size="normal"
                    placeholder="Шаблон"
                    option={actualPresets}
                    onChangeSelect={data => setPreset(data)}
                  />
                </div>
                <div className={styles.wrapGameBlock_header_select}>
                  <InformationItem variant="select" size="normal" placeholder="Год" />
                </div>
                <div className={styles.wrapGameBlock_header_select}>
                  <InformationItem variant="select" size="normal" placeholder="Месяц" />
                </div>
                <div className={styles.wrapGameBlock_header_select}>
                  <InformationItem variant="select" size="normal" placeholder="Группа" />
                </div>
                <Button onClick={() => toggleModal(true)}>
                  {gamePreset?.gamePreset?.id ? 'Изменить настройки' : 'Создать настройки'}
                </Button>
              </div>
            )}
          </div>

          <div className={styles.wrap}>
            <div className={styles.wrapInner}>
              <div className={styles.wrapGame}>
                <div className={styles.wrapGame_overlay}>
                  <GameInstance
                    width={gameViewSize}
                    onEnd={onEnd}
                    onRef={onRef}
                    {...params}
                    {...settings}
                    colors={settings?.colorsMap?.length || 1}
                  />

                  {!started && <PlayButton onStart={startGame} />}
                </div>
              </div>
            </div>
          </div>
        </section>
        <GameDesc started={started} gameTitle={gameTitle} />
      </div>
    </>
  );
});

export default Game2048;
