import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal?: number; // Кол-во светлячков
  timeComplete?: number; // Время на перемешивание
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  elementsTotal : 2,
  timeComplete : 10
};

export {
  PropsDefault
};
