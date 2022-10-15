import groupStore from 'app/stores/groupStore';
import { GamePresetT, OneGamePresent, PresetsGameSettings, ResultT } from 'app/types/GameTypes';
import { GameModal } from 'components/game-page/GameCommon/GameModal/GameModal';
import { GameResultModal } from 'components/game-page/GameCommon/GameModal/GameResultModal/GameResultModal';
import { SelectBlock } from 'components/game-page/GameCommon/SelectBlock';
import { presetArray } from 'constants/presetArr';
import { GameReturn } from 'pages/game/GameInstances/index';
import React, { FC, useEffect, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { PlayButton } from 'components/game-page/GameCommon/PlayButton';
import { convertGroupOptions } from 'utils/convertGroupOptions';
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

const gameName = GameIdentifiers.battleColors;
const GameInstance = Factory(gameName);

type Props = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const BattleColors: FC<Props> = props => {
  const { actualPresets, gamePreset } = props;
  const { deletePreset, getPreset, getGame, getPresets } = gamesStore;
  const { groups, getGroups } = groupStore;
  const { role } = appStore;
  const [started, setStarted] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultT>(defaultResult);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refs, setRef] = useState<any>(null);
  const [settings, setSettings] = useState<PresetsGameSettings>();
  const navigate = useNavigate();
  const groupOptions = convertGroupOptions(groups);

  useEffect(() => {
    if (role !== Roles.Student) {
      getPresets();
      getGroups();
    }
    getGame(gameName);
  }, []);
  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = 'Битва полушарий';
  const presetArrs: Option[] = presetArray(actualPresets);
  console.log(_.cloneDeep(gamePreset), 'gamePreset::BattleColors');

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
    setStarted(false);
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
    <GameReturn
      gameTitle={gameTitle}
      startGame={startGame}
      gameResult={gameResult}
      started={started}
      gamePreset={gamePreset.gamePreset}
      setPreset={setPreset}
      presetArrs={presetArrs}
      role={role}
      isModalOpen={isModalOpen}
      resultModal={resultModal}
      closeResultModal={closeResultModal}
      settings={settings}
      deletePreset={deletePreset}
      gameViewSize={gameViewSize}
      groupOptions={groupOptions}
      toggleModal={toggleModal}
      onRepeat={onRepeat}
      navigate={navigate}
    >
      <GameInstance
        width={gameViewSize}
        onEnd={onEnd}
        onRef={onRef}
        {...settings}
        colors={settings?.colorsMap?.length || 1}
        size={6}
      />
    </GameReturn>
  );
};

export default BattleColors;
