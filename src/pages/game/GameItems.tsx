import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { GamePresetT, OneGamePresent } from 'app/types/GameTypes';
import { observer } from 'mobx-react';
import Argus from 'pages/game/GameInstances/Argus';
import BattleColors from 'pages/game/GameInstances/BattleColors';
import Blinks from 'pages/game/GameInstances/Blinks';
import Game2048 from 'pages/game/GameInstances/Game2048';
import Lights from 'pages/game/GameInstances/Lights';
import Mental from 'pages/game/GameInstances/Mental';
import Paint from 'pages/game/GameInstances/Paint';
import ShiftVertical from 'pages/game/GameInstances/ShiftVertical';
import Shulte from 'pages/game/GameInstances/Shulte';
import Steam from 'pages/game/GameInstances/Steam';

import React, { FunctionComponent } from 'react';
import { Navigate, useParams } from 'react-router-dom';

export type GameContainerProps = {
  actualPresets: Omit<GamePresetT, 'settings'>[];
  gamePreset: OneGamePresent;
};

const qwe: { [key: string]: FunctionComponent<GameContainerProps> } = {
  shulte: Shulte,
  battleColors: BattleColors,
  game2048: Game2048,
  shiftVertical: ShiftVertical,
  steamEngine: Steam,
  silhouettes: Paint,
  memoryRhythm: Blinks,
  fireflies: Lights,
  argus: Argus,
  mental: Mental,
};

const GameItems = observer(() => {
  const { role } = appStore;
  const { gamePreset, actualPresets } = gamesStore;
  const { gameName } = useParams<'gameName'>();

  if (role === Roles.Unauthorized) {
    return <Navigate to={AppRoutes.Index} />;
  }

  if (gameName) {
    const GameComponent = qwe[gameName];
    return <GameComponent gamePreset={gamePreset} actualPresets={actualPresets} />;
  }

  return <Navigate to={AppRoutes.Games} />;
});

export default GameItems;
