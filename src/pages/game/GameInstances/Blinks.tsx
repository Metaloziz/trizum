import { GameProps } from 'app/types/GameTypes';
import { Factory, GameIdentifiers } from 'games';
import { useGame } from 'hooks/useGame';
import { GameReturn } from 'pages/game/GameInstances/index';
import React, { FC } from 'react';

const gameName = GameIdentifiers.memoryRhythm;
const GameInstance = Factory(gameName);

const COLORS = ['#4b8bf5', '#8a7ff3', '#ef8884', '#FF991F', '#BABEC6', '#8F806A', '#0B6383'];

const Blinks: FC<GameProps> = props => {
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
    stopGame,
  } = useGame({ ...props, gameName });

  // TODO: временно чтобы работала игра пока не сделают новые пропсы
  if (settings) {
    settings.colorsMap = COLORS.slice(0, settings.digitMax);
  }

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

export default Blinks;
