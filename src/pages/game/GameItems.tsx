import gamesStore from 'app/stores/gamesStore';
import { Option } from 'components/select-mui/CustomSelect';
import { actualPresets } from 'constants/presetArr';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Shulte from 'pages/game/GameInstances/Shulte';
import Game from 'pages/game/Game';
import { AppRoutes } from 'app/enums/AppRoutes';
import BattleColors from 'pages/game/GameInstances/BattleColors';
import Game2048 from 'pages/game/GameInstances/Game2048';
import Mental from 'pages/game/GameInstances/Mental';
import ShiftVertical from 'pages/game/GameInstances/ShiftVertical';

const GameItems = observer(() => {
  const params = useParams();
  const { actualPresets: presets } = gamesStore;
  const presetArr = actualPresets(presets);
  if ('gameName' in params) {
    switch (params.gameName) {
      case 'shulte':
        return <Shulte actualPresets={presetArr} />;
      case 'battleColors':
        return <BattleColors actualPresets={presetArr} />;
      case 'game2048':
        return <Game2048 actualPresets={presetArr} />;
      case 'mental':
        return <Mental actualPresets={presetArr} />;
      case 'shiftVertical':
        return <ShiftVertical actualPresets={presetArr} />;
      default:
        return <Navigate to={AppRoutes.Games} />;
    }
  }
  return <Navigate to={AppRoutes.Games} />;
});

export default GameItems;
