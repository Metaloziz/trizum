import { GameIdentifiers } from 'games';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoutes } from 'app/enums/AppRoutes';
import appStore, { Roles } from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { observer } from 'mobx-react';
import BattleColors from 'pages/game/GameInstances/BattleColors';
import Shulte from 'pages/game/GameInstances/Shulte';
import Game2048 from 'pages/game/GameInstances/Game2048';
import Mental from 'pages/game/GameInstances/Mental';
import ShiftVertical from 'pages/game/GameInstances/ShiftVertical';
import Steam from 'pages/game/GameInstances/Steam';
import Paint from 'pages/game/GameInstances/Paint';
import Blinks from 'pages/game/GameInstances/Blinks';

const GameItems = observer(() => {
  const { role } = appStore;
  const params = useParams();
  if (role === Roles.Unauthorized) {
    return <Navigate to={AppRoutes.Index} />;
  }

  if ('gameName' in params) {
    switch (params.gameName) {
      case GameIdentifiers.shulte:
        return (
          <Shulte gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
        );
      case GameIdentifiers.battleColors:
        return (
          <BattleColors
            gamePreset={gamesStore.gamePreset}
            actualPresets={gamesStore.actualPresets}
          />
        );
      case GameIdentifiers.game2048:
        return (
          <Game2048 gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
        );
      // case GameIdentifiers.mental:
      //   return (
      //     <Mental gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
      //   );
      case GameIdentifiers.shiftVertical:
        return (
          <ShiftVertical
            gamePreset={gamesStore.gamePreset}
            actualPresets={gamesStore.actualPresets}
          />
        );
      case GameIdentifiers.steamEngine:
        return (
          <Steam gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
        );
      case GameIdentifiers.silhouettes:
        return (
          <Paint gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
        );
      case GameIdentifiers.memoryRhythm:
        return (
          <Blinks gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
        );
      default:
        return <Navigate to={AppRoutes.Games} />;
    }
  }
  return <Navigate to={AppRoutes.Games} />;
});

export default GameItems;
