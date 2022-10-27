import { GameProps } from 'app/types/GameTypes';
import { Factory, GameIdentifiers } from 'games';
import { GameReturn } from './index';
import React, { FC } from 'react';
import { useGame } from 'hooks/useGame';

const gameName = GameIdentifiers.shulte;
const GameInstance = Factory(gameName);

const Shulte: FC<GameProps> = props => {
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
