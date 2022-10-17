import groupStore from 'app/stores/groupStore';
import {
  GamePresetT,
  OneGamePresent,
  PresetsGameSettings,
  ResultsT,
  ResultT,
} from 'app/types/GameTypes';
import { getPresetArrOptions } from 'constants/presetArr';
import { GameReturn } from 'pages/game/GameInstances/index';
import React, { FC, useEffect, useState } from 'react';
import { Factory, GameIdentifiers } from 'games';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { defaultResult } from 'utils/gameUtils/defaultResultValue';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';
import gamesStore from 'app/stores/gamesStore';
import { useNavigate } from 'react-router-dom';
import appStore, { Roles } from 'app/stores/appStore';
import { Option } from 'components/select-mui/CustomSelect';
import _ from 'lodash';

const gameName = GameIdentifiers.shulte;
const GameInstance = Factory(gameName);

type Props = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const Shulte: FC<Props> = props => {
  const { actualPresets, gamePreset } = props;
  const { deletePreset, getPreset, getPresets, getGame, game } = gamesStore;
  const { groups, getGroups } = groupStore;
  const { role } = appStore;
  const [started, setStarted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultsT>(defaultResult);
  const [settings, setSettings] = useState<PresetsGameSettings>(gamePreset.gamePreset.settings[0]);
  const [refs, setRef] = useState<any>(null);

  const navigate = useNavigate();
  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = 'Таблица Шульте';
  const presetArr: Option[] = getPresetArrOptions(actualPresets);
  const groupOptions = convertGroupOptions(groups);

  useEffect(() => {
    if (role !== Roles.Student) {
      getPresets();
      getGroups();
    }
    getGame(gameName);
    return () => {
      getPreset('');
    };
  }, []);
  const onRef = (refGame: any) => setRef(refGame);

  const startGame = () => {
    if (gamePreset.gamePreset.status !== 'archive') {
      setStarted(true);
      refs?.start();
    } else {
      console.warn(`Error!!! Game haves status: ${gamePreset.gamePreset.status.toUpperCase()}`);
    }
  };

  const onEnd = (result?: any) => {
    setResultModal(true);
    setStarted(false);
    setGameResult(result);
  };

  const setPreset = (data: Option) => {
    setStarted(false);
    getPreset(data.value);
  };

  const toggleModal = (value: boolean) => setIsModalOpen(value);

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
      game={game}
      gameTitle={gameTitle}
      startGame={startGame}
      gameResult={gameResult}
      started={started}
      gamePreset={gamePreset.gamePreset}
      setPreset={setPreset}
      presetArrs={presetArr}
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
        // colors={settings[0]?.colorsMap?.length || 1}
        // size={6}
      />
    </GameReturn>
  );
};

export default Shulte;
