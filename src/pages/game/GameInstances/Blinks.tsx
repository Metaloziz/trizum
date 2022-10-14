import groupStore from 'app/stores/groupStore';
import { GamePresetT, OneGamePresent, PresetsGameSettings, ResultT } from 'app/types/GameTypes';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { presetArray } from 'constants/presetArr';
import React, { FC, useEffect, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import { convertGroupOptions } from 'utils/convertGroupOptions';
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
import _ from 'lodash';

const gameName = GameIdentifiers.memoryRhythm;
const GameInstance = Factory(gameName);

type Props = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const Blinks: FC<Props> = props => {
  const { actualPresets, gamePreset } = props;
  const { deletePreset, getPreset, getPresets, getGame } = gamesStore;
  const { groups, getGroups } = groupStore;
  const { role } = appStore;

  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultT>(defaultResult);
  const [settings, setSettings] = useState<PresetsGameSettings>();
  const [refs, setRef] = useState<any>(null);
  const navigate = useNavigate();
  const groupOptions = convertGroupOptions(groups);

  useEffect(() => {
    if (role !== Roles.Student) {
      getPresets();
      getGroups();
    }
    getGame(gameName);
  }, []);

  console.log(_.cloneDeep(gamePreset), 'gamePreset::Blinks');
  console.log(_.cloneDeep(actualPresets), 'actualPresets::Blinks');
  console.log('-------------------------------------------------');
  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = 'Память и ритм';
  const presetArrs: Option[] = presetArray(actualPresets);

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
                    option={presetArrs}
                    onChangeSelect={data => setPreset(data)}
                  />
                </div>
                {/* <div className={styles.wrapGameBlock_header_select}> */}
                {/*  <InformationItem variant="select" size="normal" placeholder="Год" /> */}
                {/* </div> */}
                {/* <div className={styles.wrapGameBlock_header_select}> */}
                {/*  <InformationItem variant="select" size="normal" placeholder="Месяц" /> */}
                {/* </div> */}
                <div className={styles.wrapGameBlock_header_select}>
                  <InformationItem
                    variant="select"
                    size="normal"
                    placeholder="Группа"
                    option={groupOptions}
                  />
                </div>
                <Button onClick={() => toggleModal(true)}>
                  {gamePreset?.gamePreset?.id ? 'Изменить настройки' : 'Создать настройки'}
                </Button>
              </div>
            )}
          </div>

          <div className={`${styles.wrap} ${role === Roles.Student && styles.isStudent}`}>
            <div className={styles.wrapInner}>
              <div className={styles.wrapGame}>
                <div className={styles.wrapGame_overlay}>
                  <GameInstance
                    width={gameViewSize}
                    onEnd={onEnd}
                    onRef={onRef}
                    {...settings}
                    colors={settings?.colorsMap?.length || 1}
                    size={6}
                  />

                  {!started && <PlayButton onStart={startGame} />}
                </div>
              </div>
            </div>
          </div>
        </section>
        <GameDesc presetDesc={settings?.description} started={started} gameTitle={gameTitle} />
      </div>
    </>
  );
};

export default Blinks;
