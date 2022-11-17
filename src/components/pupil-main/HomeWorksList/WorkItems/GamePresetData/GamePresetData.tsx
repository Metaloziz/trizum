import { GameTypeTitle } from 'app/enums/gameTypeTitle';
import { GamePresetFromLoadme } from 'app/types/LoadMeTypes';
import { FC } from 'react';
import style from './GamePresetData.module.scss';

type Props = {
  preset: GamePresetFromLoadme;
};

export const GamePresetData: FC<Props> = ({ preset }) => (
  <div className={style.container}>
    <div>{GameTypeTitle[preset.gamePreset.game.type as keyof typeof GameTypeTitle]}</div>
    <p>{preset.gamePreset.game.name}</p>
  </div>
);
