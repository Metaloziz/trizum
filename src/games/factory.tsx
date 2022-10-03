//ignore-loader.js
import React, {Component} from 'react';

import {
    PropsDefault as SchultePropsDefault,
    Component as SchulteComponent
} from './games/schulte';
import {
    PropsDefault as Game2048PropsDefault,
    Component as Game2048Component
} from './games/2048';
import {
    PropsDefault as MentalPropsDefault,
    Component as MentalComponent
} from './games/mental';
import {
    PropsDefault as ShiftVerticalPropsDefault,
    Component as ShiftVerticalComponent
} from './games/shift-vertical';
import {
    PropsDefault as BattleColorsPropsDefault,
    Component as BattleColorsComponent
} from './games/battle-colors';

export const GameIdentifiers = {
    schulte: 'schulte',
    game2048: 'game2048',
    mental: 'mental',
    shiftVertical: 'shiftVertical',
    battleColors: 'battleColors'
};

export const GameList = {
    [GameIdentifiers.schulte]: {
        name: 'Таблица Шульте',
        component: SchulteComponent,
        props: SchultePropsDefault
    },
    [GameIdentifiers.game2048]: {
        name: 'Игра 2048',
        component: Game2048Component,
        props: Game2048PropsDefault
    },
    [GameIdentifiers.mental]: {
        name: 'Ментальный счет',
        component: MentalComponent,
        props: MentalPropsDefault
    },
    [GameIdentifiers.shiftVertical]: {
        name: 'Сдвиг по вертикали',
        component: ShiftVerticalComponent,
        props: ShiftVerticalPropsDefault
    },
    [GameIdentifiers.battleColors]: {
        name: 'Битва полушарий',
        component: BattleColorsComponent,
        props: BattleColorsPropsDefault
    },
};

export function factory(
    name: any
) {
    const TempGameList: any = GameList;

    if (typeof TempGameList[name] === 'undefined') {
        throw 'Not found game';
    }

    const GameInstance = TempGameList[name];
    const GameInstanceComponent = GameInstance.component;

    return (props: any) => {
        const propsFull = {
            ...GameInstance.props,
            ...props
        };

        return <GameInstanceComponent
            {...propsFull}
        />;
    };
}
