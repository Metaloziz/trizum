import { GameProps } from 'app/types/GameTypes';
import { Factory, GameIdentifiers } from 'games';
import { useGame } from 'hooks/useGame';
import { GameReturn } from 'pages/game/GameInstances/index';
import React, { FC } from 'react';

const gameName = GameIdentifiers.argus;
const GameInstance = Factory(gameName);

const Argus: FC<GameProps> = props => {
  const { gamePreset } = props;
  const {
    role,
    gameResult,
    gameTitle,
    gameViewSize,
    presetArr,
    game,
    startGame,
    settings,
    closeResultModal,
    onRepeat,
    resultModal,
    setPreset,
    groupOptions,
    started,
    deletePreset,
    isModalOpen,
    toggleModal,
    onRef,
    onEnd,
    navigate,
  } = useGame({ ...props, gameName });

  const stopGame = () => {
    setStarted(false);
    refs?.stop();
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
        timeMax: gameResult.timeDiff,
        cycleTimeAv: 1,
        actionSpeedAv: 1,
        workCompleted: false,
        courseCompleted: false,
        /* конец под вопросом */
      };
      sendResults(params);
    }
    setResultModal(false);
    setGameResult(defaultResult);
  };

  return (
    <GameReturn
      stopGame={stopGame}
      game={game}
      gameTitle={gameTitle}
      startGame={startGame}
      gameResult={gameResult}
      started={started}
      gamePreset={gamePreset.gamePreset}
      setPreset={setPreset}
      presetArr={presetArr}
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

export default Argus;
