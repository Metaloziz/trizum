import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal?: number; // Кол-во светлячков
  digitMax?: number; // Всего светлячков
  timeComplete?: number; // Время на перемешивание
  speed?: number; // Скорость движения
  levelMaxCompleted?: number; // Кол-во уровней
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  elementsTotal : 2,
  digitMax : 10,
  speed : 64,
  levelMaxCompleted : 1,
  timeComplete : 10
};

export {
  PropsDefault
};
