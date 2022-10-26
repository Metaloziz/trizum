import appStore, { Roles } from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import groupStore from 'app/stores/groupStore';
import {
  GameProps,
  PlaySendResultT,
  PresetsGameSettings,
  ResultsNewT,
  ResultsT,
} from 'app/types/GameTypes';
import { Option } from 'components/select-mui/CustomSelect';
import { getPresetArrOptions } from 'constants/presetArr';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertGroupOptions } from 'utils/convertGroupOptions';
import { changedViewScreen } from 'utils/gameUtils/changeViewScreen';
import { newDefaultResult } from 'utils/gameUtils/defaultResultValue';

type useGameProps = GameProps & {
  gameName: string;
};

export const useGame = ({ actualPresets, gamePreset, gameName }: useGameProps) => {
  const { role, user } = appStore;
  const { groups, getGroups } = groupStore;
  const { deletePreset, getPreset, getPresets, getGame, game, sendResults } = gamesStore;

  const [refs, setRef] = useState<any>(null);
  const [started, setStarted] = useState(false);
  const [isModalOpen, toggleModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultsNewT>(newDefaultResult);
  const [settings, setSettings] = useState<PresetsGameSettings>(gamePreset.gamePreset.settings[0]);

  const navigate = useNavigate();
  const gameTitle = game.name;
  const widthScreen = window.innerWidth;
  const groupOptions = convertGroupOptions(groups);
  const presetArr: Option[] = getPresetArrOptions(actualPresets);
  const gameViewSize = changedViewScreen(widthScreen, 700);

  const onRef = (refGame: any) => setRef(refGame);

  const startGame = () => {
    if (gamePreset.gamePreset.status !== 'archive') {
      setStarted(true);
      refs?.start();
    } else {
      console.warn(`Error!!! Game haves status: ${gamePreset.gamePreset.status.toUpperCase()}`);
    }
  };

  const stopGame = () => {
    setStarted(false);
    refs?.stop();
  };

  const onEnd = (result?: ResultsT) => {
    setResultModal(true);
    setStarted(false);

    if (result) {
      // TODO: newResult временно пока данные с игры другие
      const newResult: ResultsNewT = {
        time: result.time,
        gameCode: game.code,
        success: result.score,
        templateCode: 0,
        result: result.result,
        timeMax: result.timeDiff,
      };
      setGameResult(newResult);
    }
  };

  const setPreset = async (data: Option) => {
    setStarted(false);
    await getPreset(data.value);
  };

  // const toggleModal = (value: boolean) => setIsModalOpen(value);

  const onRepeat = () => {
    setResultModal(false);
    onRef(refs);
    startGame();
  };

  const closeResultModal = () => {
    if (role === Roles.Student) {
      const params: PlaySendResultT = {
        /* нормальные настройки(но не факт) */
        userGroupId: user.groups[0].id,
        courseWorkId: user.groups[0].group.course.works[0].id,
        /* конец нормальных настроек */
        /* под вопросом - уточнить у аналитиков и Александра */
        workGamePresetId: user.groups[0].group.course.works[0].work.gamePresets[0].id,
        finished: resultModal,
        groupsCount: settings.groupsCount,
        elementsTotal: settings.elementsTotal,
        levelMaxCompleted: settings.levelMaxCompleted,
        cycleTime: settings.cycleTime,
        blinksCount: settings.blinksCount,
        wordsCount: settings.wordsCount,
        speed: settings.speed,
        // ?????????
        actionsSuccessfulCount: gameResult.success,
        actionSpeed: 1,
        actions: 1,
        time: gameResult.time,
        errorsPercentage: 1,
        phraseSpeedAv: 1,
        timeMax: gameResult.timeMax!,
        cycleTimeAv: 1,
        actionSpeedAv: 1,
        workCompleted: false,
        courseCompleted: false,
        /* конец под вопросом */
      };
      sendResults(params);
    }
    setResultModal(false);
    setGameResult(newDefaultResult);
  };

  useEffect(() => {
    if (role !== Roles.Student) {
      getPresets();
      getGroups();
    }
    getGame(gameName);

    if (role === Roles.Student) {
      // getPreset()
    }

    return () => {
      getPreset('');
    };
  }, []);

  useEffect(() => {
    if (gamePreset.gamePreset.settings.length) {
      setSettings(gamePreset.gamePreset.settings[0]);
    }
  }, [gamePreset]);

  return {
    game,
    gameTitle,
    startGame,
    gameResult,
    started,
    setPreset,
    presetArr,
    role,
    isModalOpen,
    resultModal,
    closeResultModal,
    settings,
    deletePreset,
    gameViewSize,
    groupOptions,
    toggleModal,
    onRepeat,
    navigate,
    onEnd,
    onRef,
    stopGame,
  };
};