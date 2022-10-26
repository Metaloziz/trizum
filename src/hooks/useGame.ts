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
  const [settings, setSettings] = useState<PresetsGameSettings>({});

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

  const closeResultModal = async () => {
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
      await sendResults(params);
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
  };
};
