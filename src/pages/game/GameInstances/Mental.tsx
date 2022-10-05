import React, { useEffect, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import styles from '../Game.module.scss';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';
import gamesStore from 'app/stores/gamesStore';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/button/Button';
import appStore, { Roles } from 'app/stores/appStore';
import InformationItem from 'components/information-item/InformationItem';
import { presetArr } from 'constants/presetArr';
import { Option } from 'components/select-mui/CustomSelect';

const gameName = GameIdentifiers.mental;
const GameInstance = Factory(gameName);

const Shulte = () => {
  const { actualPresets, gamePreset, deletePreset } = gamesStore;
  const { role } = appStore;
  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gameTitle = 'Ментальный счет';

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
    <div className={styles.wrapGameBlock} key={gameTitle}>
      <section>
        <div style={{ minWidth: `${gameViewSize + 100}px` }}>
          {(role === Roles.Methodist || role === Roles.Admin) && (
            <div className={styles.wrapGameBlock_header}>
              <div className={styles.wrapGameBlock_header_select}>
                <InformationItem
                  variant="select"
                  size="normal"
                  placeholder="Шаблон"
                  option={presetArr}
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
          <Button onClick={() => navigate(-1)}>Назад</Button>
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
  );
};

export default Shulte;
