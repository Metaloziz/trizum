import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Shulte from 'pages/game/GameInstances/Shulte';
import { AppRoutes } from 'app/enums/AppRoutes';
import BattleColors from 'pages/game/GameInstances/BattleColors';
import Game2048 from 'pages/game/GameInstances/Game2048';
import Mental from 'pages/game/GameInstances/Mental';
import ShiftVertical from 'pages/game/GameInstances/ShiftVertical';

const GameItems = () => {
  const params = useParams();
  if ('gameName' in params) {
    switch (params.gameName) {
      case 'shulte':
        return <Shulte />;
      case 'battleColors':
        return <BattleColors />;
      case 'game2048':
        return <Game2048 />;
      case 'mental':
        return <Mental />;
      case 'shiftVertical':
        return <ShiftVertical />;
      default:
        return <Navigate to={AppRoutes.Games} />;
    }
  }
  return <Navigate to={AppRoutes.Games} />;
};

export default GameItems;
