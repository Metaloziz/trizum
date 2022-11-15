import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal?: number; // Кол-во угадываний
  errorAacceptable?: number; // Кол-во возможных ошибок
  digitMax?: number; // Кол-во уровней
  timeComplete?: number; // Время на прохождение
  speed?: number; // Время на которое появляются слова в милисекундах
  wordsFull?: boolean; // Писать слова полностью или две буквы
  wordsCount?: number; // Кол-во слов
  onEnd?(result?: GameResult): void;
}

const PropsDefault: Props = {
  width: 200,
  timeComplete: 10,
  elementsTotal: 2,
  errorAacceptable: 2,
  digitMax: 3,
  speed: 2000,
  wordsFull: false,
  wordsCount: 1,
};

export { PropsDefault };
