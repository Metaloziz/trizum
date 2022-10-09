import { GamePresetT, OneGamePresent, PresetsGameSettings, ResultT } from 'app/types/GameTypes';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { presetArray } from 'constants/presetArr';
import React, { FC, useEffect, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import { defaultResult } from 'utils/gameUtils/defaultResultValue';
import styles from '../Game.module.scss';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';
import gamesStore from 'app/stores/gamesStore';
import { GameDesc } from 'components/game-page/GameCommon/GameDesc';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'components/button/Button';
import appStore, { Roles } from 'app/stores/appStore';
import InformationItem from 'components/information-item/InformationItem';
import { Option } from 'components/select-mui/CustomSelect';
import _ from 'lodash';

const gameName = GameIdentifiers.mental;
const GameInstance = Factory(gameName);

type Props = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const Mental: FC<Props> = props => {
  const { actualPresets, gamePreset } = props;
  const { deletePreset, getPreset } = gamesStore;
  const { role } = appStore;
  const [started, setStarted] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultT>(defaultResult);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refs, setRef] = useState<any>(null);
  const [settings, setSettings] = useState<PresetsGameSettings>();

  const navigate = useNavigate();

  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = 'Ментальный счет';
  const presetArr: Option[] = presetArray(actualPresets);
  console.log(_.cloneDeep(gamePreset), 'gamePreset::Mental');
  const onRef = (refGame: any) => {
    setRef(refGame);
  };

  const startGame = () => {
    setStarted(true);
    refs?.start();
  };

  const onEnd = (result: any) => {
    setResultModal(true);
    setStarted(false);
    setGameResult(result);
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

  useEffect(() => {
    if (gamePreset.gamePreset.settings.length) {
      setSettings(gamePreset.gamePreset.settings[0]);
    }
  }, [gamePreset]);

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
      <div className={styles.wrapGameBlock} key={gameTitle}>
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

export default Mental;
