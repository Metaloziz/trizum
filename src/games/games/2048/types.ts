import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  groupsCount?: number; // Размер поля x на x
  elementsTotal?: number; // Стартовое кол-во тайлов
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  groupsCount: 4,
  elementsTotal: 2
};

export {
  PropsDefault
};
