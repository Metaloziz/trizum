import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import groupStore from 'app/stores/groupStore';
import { GameProps, PlaySendResultT, PresetsGameSettings, ResultsNewT } from 'app/types/GameTypes';
import { Option } from 'components/select-mui/CustomSelect';
import { DEFAULT_GAME_SETTINGS } from 'constants/games';
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
  const { role } = appStore;
  const { groups } = groupStore;
  const {
    deletePreset: deletePresetStore,
    getPreset,
    getPresets,
    getGame,
    game,
    sendResults,
    identificationParams,
    setIsLoading,
    isLoading,
    changePage,
  } = gamesStore;

  const [refs, setRef] = useState<any>(null);
  const [started, setStarted] = useState(false);
  const [isModalOpen, setToggleModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<ResultsNewT>(newDefaultResult);
  const [settings, setSettings] = useState<Partial<PresetsGameSettings>>({});

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
  const toggleModal = (value: boolean) => {
    setToggleModal(value);
    stopGame();
  };

  const onEnd = (result?: ResultsNewT) => {
    setResultModal(true);
    setStarted(false);

    if (result) {
      setGameResult(result);
    }
  };

  const setPreset = async (data: string) => {
    stopGame();
    await getPreset(data);
  };

  const deletePreset = async (id: string) => {
    await deletePresetStore(id);
    await getPreset(id);
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
        userGroupId: identificationParams.userGroupId,
        courseWorkId: identificationParams.courseWorkId,
        workGamePresetId: identificationParams.workGamePresetId,

        time: gameResult.time,
        workCompleted: false,
        courseCompleted: false,
        failed: gameResult.failed!,
        finished: gameResult.finished || true,
        levelMaxCompleted: gameResult.levelMaxCompleted!,
        levelMinCompleted: gameResult.levelMinCompleted!,
        success: gameResult.success || gameResult.score!,
      };
      await sendResults(params);
    }
    setResultModal(false);
    setGameResult(newDefaultResult);
  };

  const requestPresets = async () => {
    setIsLoading(true);
    if (role !== Roles.Student) {
      await getPresets({ game_code: gameName });
    }
    await getGame(gameName);

    setIsLoading(false);
  };

  const changePagePresets = async (page: number) => {
    changePage(page);
    await requestPresets();
  };

  useEffect(() => {
    requestPresets();

    return () => {
      getPreset('');
    };
  }, []);

  useEffect(() => {
    if (gamePreset.gamePreset.id.length === 0) {
      setSettings(DEFAULT_GAME_SETTINGS[gameName]);
    } else {
      setSettings(gamePreset.gamePreset.settings[0]);
    }
  }, [gamePreset.gamePreset]);

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
    isLoading,
    changePagePresets,
  };
};
