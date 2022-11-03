import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  digitMax?: number; // Максимальное число
  timeComplete?: number; // Время на прохождение
  groupsCount?: number; // Размер поля x на x
  elementsTotal?: number; // Стартовое кол-во тайлов
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete: 0,
  digitMax: 2048,
  groupsCount: 4,
  elementsTotal: 2
};

export {
  PropsDefault
};
