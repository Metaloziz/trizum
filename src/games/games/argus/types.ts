import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number; // Время на прохождение
  elementsTotal?: number; // Кол-во угадываний
  errorAacceptable?: number; // Кол-во возможных ошибок
  speed?: number; // Время на которое появляются числа в мили секундах
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 10,
  elementsTotal : 2,
  errorAacceptable : 2,
  speed : 2000
};

export {
  PropsDefault
};