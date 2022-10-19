import groupStore from 'app/stores/groupStore';
import {
  GamePresetT,
  OneGamePresent,
  PlaySendResultT,
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

const gameName = GameIdentifiers.fireflies;
const GameInstance = Factory(gameName);

type Props = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const Lights: FC<Props> = props => {
  const { actualPresets, gamePreset } = props;
  const { deletePreset, getPreset, getPresets, getGame, game, sendResults } = gamesStore;
  const { role, user } = appStore;
  const { groups, getGroups } = groupStore;
  console.log(game);
  const [started, setStarted] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultsT>(defaultResult);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refs, setRef] = useState<any>(null);
  const [settings, setSettings] = useState<PresetsGameSettings>(gamePreset.gamePreset.settings[0]);

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
  const navigate = useNavigate();
  const widthScreen = window.innerWidth;
  const gameViewSize = changedViewScreen(widthScreen, 700);
  const gameTitle = game.name;

  const groupOptions = convertGroupOptions(groups);
  const onRef = (refGame: any) => {
    setRef(refGame);
  };

  const startGame = () => {
    if (gamePreset.gamePreset.status !== 'archive') {
      setStarted(true);
      refs?.start();
    } else {
      console.warn(
        `Ошибка!!! Вы не можете запустить игру которая имеет статус: ${gamePreset.gamePreset.status.toUpperCase()}`,
      );
    }
  };

  const onEnd = (result: any) => {
    // Пример использования результатов игры
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
    if (role === Roles.Student) {
      const params: PlaySendResultT = {
        userGroupId: user.groups[0].id,
        courseWorkId: user.groups[0].group.course.id,
        workGamePresetId: user.groups[0].group.course.works[0].work.gamePresets[0].gamePreset.id,
        finished: resultModal,
        time: 1,
        groupsCount: 1,
        elementsTotal: 1,
        levelMaxCompleted: 1,
        actions: 1,
        actionSpeed: 1,
        actionsSuccessfulCount: 1,
        cycleTime: 1,
        blinksCount: 1,
        wordsCount: 1,
        speed: 1,
        errorsPercentage: 1,
        phraseSpeedAv: 1,
        timeMax: 1,
        cycleTimeAv: 1,
        actionSpeedAv: 1,
        workCompleted: false,
        courseCompleted: false,
      };
      sendResults(params);
    }
    setResultModal(false);
    setGameResult(defaultResult);
  };

  const presetArrs: Option[] = getPresetArrOptions(actualPresets);

  useEffect(() => {
    if (gamePreset?.gamePreset.settings.length) {
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
      presetArr={presetArrs}
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
      <GameInstance width={gameViewSize} onEnd={onEnd} onRef={onRef} {...settings} />
    </GameReturn>
  );
};

export default Lights;
