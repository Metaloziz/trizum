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
import {
    PropsDefault as SteamPropsDefault,
    Component as SteamComponent
} from './games/steam';
import {
    PropsDefault as PaintPropsDefault,
    Component as PaintComponent
} from './games/paint';
import {
    PropsDefault as BlinksPropsDefault,
    Component as BlinksComponent
} from './games/blinks';
import {
    PropsDefault as LightsPropsDefault,
    Component as LightsComponent
} from './games/lights';
import {
    PropsDefault as ArgusPropsDefault,
    Component as ArgusComponent
} from './games/argus';
import {
    PropsDefault as FrazesPropsDefault,
    Component as FrazesComponent
} from './games/frazes';

export const GameIdentifiers = {
    shulte: 'shulte',
    game2048: 'game2048',
    mental: 'mental',
    shiftVertical: 'shiftVertical',
    battleColors: 'battleColors',
    steamEngine: 'steamEngine',
    silhouettes: 'silhouettes',
    memoryRhythm: 'memoryRhythm',
    fireflies: 'fireflies',
    argus: 'argus',
    frazes: 'frazes',
};

export const GameList = {
    [GameIdentifiers.shulte]: {
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
    [GameIdentifiers.steamEngine]: {
        name: 'Паровик',
        component: SteamComponent,
        props: SteamPropsDefault
    },
    [GameIdentifiers.silhouettes]: {
        name: 'Бирюльки',
        component: PaintComponent,
        props: PaintPropsDefault
    },
    [GameIdentifiers.memoryRhythm]: {
        name: 'Память и ритм',
        component: BlinksComponent,
        props: BlinksPropsDefault
    },
    [GameIdentifiers.fireflies]: {
        name: 'Светлячки',
        component: LightsComponent,
        props: LightsPropsDefault
    },
    [GameIdentifiers.argus]: {
        name: 'Аргус',
        component: ArgusComponent,
        props: ArgusPropsDefault
    },
    [GameIdentifiers.frazes]: {
        name: 'Фразоскоп',
        component: FrazesComponent,
        props: FrazesPropsDefault
    }
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
