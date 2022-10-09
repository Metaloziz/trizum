import { ResultT } from 'app/types/GameTypes';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { presetArray } from 'constants/presetArr';
import React, { useEffect, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import { defaultResult } from 'utils/gameUtils/defaultResultValue';
import styles from '../Game.module.scss';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';
import gamesStore from 'app/stores/gamesStore';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { useNavigate } from 'react-router-dom';
import Button from 'components/button/Button';
import appStore, { Roles } from 'app/stores/appStore';
import InformationItem from 'components/information-item/InformationItem';
import { Option } from 'components/select-mui/CustomSelect';

const gameName = GameIdentifiers.shulte;
const GameInstance = Factory(gameName);

const Shulte = () => {
  const { actualPresets, gamePreset, deletePreset, getPreset } = gamesStore;
  const { role } = appStore;
  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultT>(defaultResult);
  const [settings, setSettings] = useState(gamePreset.gamePreset.settings[0]);
  const [refs, setRef] = useState<any>(null);
  const navigate = useNavigate();
  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = 'Таблица Шульте';
  const params = {
    size: 4,
    startTiles: 2,
  }; // Уникальные параметры для конкретной игры

  // let ref: any = null;
  const onRef = (refGame: any) => {
    setRef(refGame);
  };
  const startGame = () => {
    setStarted(true);
    refs?.start();
  };
  const presetArrs: Option[] = presetArray(actualPresets);

  const onEnd = (result: any) => {
    setResultModal(true);
    setStarted(false);
    setGameResult(result);
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
    console.log(message.join('\n'));
  };

  const setPreset = (data: Option) => {
    getPreset(data.value);
  };

  const toggleModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onRepeat = () => {
    setResultModal(false);
    onRef(refs);
    startGame();
  };
  const closeResultModal = () => {
    setResultModal(false);
    setGameResult(defaultResult);
  };
  return (
    <>
      {(role === Roles.Methodist || role === Roles.Admin) && (
        <GameModal open={isModalOpen} onClose={toggleModal} deletePreset={deletePreset} />
      )}
      <GameResultModal
        open={resultModal}
        time={gameResult?.time}
        error={gameResult?.failed}
        success={gameResult?.success}
        onClose={closeResultModal}
        onStart={onRepeat}
      />
      <div className={styles.wrapGameBlock}>
        <Button className={styles.goBack} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <section>
          <div style={{ minWidth: `${gameViewSize + 100}px` }}>
            {(role === Roles.Methodist || role === Roles.Admin) && (
              <div className={styles.wrapGameBlock_header}>
                <div className={styles.wrapGameBlock_header_select}>
                  <InformationItem
                    variant="select"
                    size="normal"
                    placeholder="Шаблон"
                    option={presetArrs}
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
};

export default Shulte;
