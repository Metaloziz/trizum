import groupStore from 'app/stores/groupStore';
import { GamePresetT, OneGamePresent, PresetsGameSettings, ResultT } from 'app/types/GameTypes';
import { presetArray } from 'constants/presetArr';
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

const gameName = GameIdentifiers.shiftVertical;
const GameInstance = Factory(gameName);

type Props = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const ShiftVertical: FC<Props> = props => {
  const { actualPresets, gamePreset } = props;
  const { deletePreset, getPreset, getPresets, getGame } = gamesStore;
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
    getGame('shiftVertical');
  }, []);

  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = 'Сдвиг по вертикали';
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

export default ShiftVertical;
