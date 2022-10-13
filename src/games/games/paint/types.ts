import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number; // Время на прохождение
  elementsTotal?: number; // Всего успехов
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 10,
  elementsTotal : 2,
};

export {
  PropsDefault
};
