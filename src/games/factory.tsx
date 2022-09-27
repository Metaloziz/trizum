//ignore-loader.js
import React, { Component } from 'react';

import { PropsDefault as SchultePropsDefault, Component as SchulteComponent} from './games/schulte';
import { PropsDefault as Game2048PropsDefault, Component as Game2048Component} from './games/2048';
import { PropsDefault as MentalPropsDefault, Component as MentalComponent} from './games/mental';
import { PropsDefault as ShiftVerticalPropsDefault, Component as ShiftVerticalComponent} from './games/shift-vertical';
import { PropsDefault as BattleColorsPropsDefault, Component as BattleColorsComponent} from './games/battle-colors';

export const GameIdentifiers = {
  schulte : 'schulte',
  Game2048 : 'Game2048',
  mental : 'mental',
  'shift-vertical' : 'shift-vertical',
  'battle-colors' : 'battle-colors'
};

export const GameList = {
  [GameIdentifiers.schulte] : {
    name : 'Таблица Шульте',
    component : SchulteComponent,
    props : SchultePropsDefault
  },
  [GameIdentifiers.Game2048] : {
    name : 'Игра 2048',
    component : Game2048Component,
    props : Game2048PropsDefault
  },
  [GameIdentifiers.mental] : {
    name : 'Ментальный счет',
    component : MentalComponent,
    props : MentalPropsDefault
  },
  [GameIdentifiers['shift-vertical']] : {
    name : 'Сдвиг по вертикали',
    component : ShiftVerticalComponent,
    props : ShiftVerticalPropsDefault
  },
  [GameIdentifiers['battle-colors']] : {
    name : 'Битва полушарий',
    component : BattleColorsComponent,
    props : BattleColorsPropsDefault
  },
};

export function factory(
  name : any
) {
  const TempGameList : any = GameList;

  if(typeof TempGameList[name] === 'undefined') {
    throw 'Not found game';
  }

  const GameInstance = TempGameList[name];
  const GameInstanceComponent = GameInstance.component;

  return (props : any) => {
    const propsFull = {
      ...GameInstance.props,
      ...props
    };

    return <GameInstanceComponent
      {...propsFull}
    />;
  };
}
