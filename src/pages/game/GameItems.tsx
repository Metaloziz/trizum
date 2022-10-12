import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Shulte from 'pages/game/GameInstances/Shulte';
import { AppRoutes } from 'app/enums/AppRoutes';
import BattleColors from 'pages/game/GameInstances/BattleColors';
import Game2048 from 'pages/game/GameInstances/Game2048';
import Mental from 'pages/game/GameInstances/Mental';
import ShiftVertical from 'pages/game/GameInstances/ShiftVertical';
import Steam from 'pages/game/GameInstances/Steam';
import Paint from 'pages/game/GameInstances/Paint';
import Blinks from 'pages/game/GameInstances/Blinks';
import { observer } from 'mobx-react';
import gamesStore from 'app/stores/gamesStore';

const GameItems = observer(() => {
  const params = useParams();
  if ('gameName' in params) {
    switch (params.gameName) {
      case 'shulte':
        return (
          <Shulte gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />
        );
      case 'battleColors':
        return <BattleColors gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      case 'game2048':
        return <Game2048 gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      case 'mental':
        return <Mental gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      case 'shiftVertical':
        return <ShiftVertical gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      case 'steam':
        return <Steam gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      case 'paint':
        return <Paint gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      case 'blinks':
        return <Blinks gamePreset={gamesStore.gamePreset} actualPresets={gamesStore.actualPresets} />;
      default:
        return <Navigate to={AppRoutes.Games} />;
    }
  }
  return <Navigate to={AppRoutes.Games} />;
});

export default GameItems;
