import { AppRoutes } from 'app/enums/AppRoutes';
import { Roles } from 'app/enums/Roles';
import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { GamePresetT, OneGamePresent, PresetsGameSettings, ResultsNewT } from 'app/types/GameTypes';
import { Factory, GameIdentifiers } from 'games';
import { useGame } from 'hooks/useGame';
import { observer } from 'mobx-react';
import { GameReturn } from 'pages/game/GameInstances';

import React, { FunctionComponent } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export type GameContainerProps = Partial<PresetsGameSettings> & {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
  width: number;
  onEnd: (result?: ResultsNewT) => void;
  onRef: (refGame: any) => void;
};

const GAMES: { [key: string]: FunctionComponent<GameContainerProps & any> } = {
  [GameIdentifiers.shulte]: Factory(GameIdentifiers.shulte),
  [GameIdentifiers.battleColors]: Factory(GameIdentifiers.battleColors),
  [GameIdentifiers.game2048]: Factory(GameIdentifiers.game2048),
  [GameIdentifiers.shiftVertical]: Factory(GameIdentifiers.shiftVertical),
  [GameIdentifiers.steamEngine]: Factory(GameIdentifiers.steamEngine),
  [GameIdentifiers.silhouettes]: Factory(GameIdentifiers.silhouettes),
  [GameIdentifiers.memoryRhythm]: Factory(GameIdentifiers.memoryRhythm),
  [GameIdentifiers.fireflies]: Factory(GameIdentifiers.fireflies),
  [GameIdentifiers.argus]: Factory(GameIdentifiers.argus),
  [GameIdentifiers.mental]: Factory(GameIdentifiers.mental),
  [GameIdentifiers.difference]: Factory(GameIdentifiers.difference),
  [GameIdentifiers.frazes]: Factory(GameIdentifiers.frazes),
  [GameIdentifiers.bullsAndCows]: Factory(GameIdentifiers.bullsAndCows),
};

const GameItems = observer(() => {
  const { role } = appStore;
  const { gamePreset, actualPresets } = gamesStore;
  const { gameName } = useParams<'gameName'>();

  if (gameName) {
    const {
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
      isLoading,
    } = useGame({ gamePreset, actualPresets, gameName });

    if (role === Roles.Unauthorized) {
      return <Navigate to={AppRoutes.Index} />;
    }

    const GameInstance = GAMES[gameName];

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
        isLoading={isLoading}
      >
        <GameInstance width={gameViewSize} onEnd={onEnd} onRef={onRef} {...settings} />
      </GameReturn>
    );
  }

  return <Navigate to={AppRoutes.Games} />;
});

export default GameItems;
