import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal?: number; // Кол-во угадываний
  errorAacceptable?: number; // Кол-во возможных ошибок
  timeComplete?: number; // Время на прохождение
  speed?: number; // Время на которое появляются слова в милисекундах
  wordsFull?: boolean; // Писать слова полностью или две буквы
  words?: string[]; // Cлова
  onEnd?(result?: GameResult): void;
}

const PropsDefault: Props = {
  width: 200,
  timeComplete: 10,
  errorAacceptable: 2,
  speed: 2000,
  wordsFull: false,
  words: ['Ухо', 'Сухо', 'Сом', 'Уха', 'Мох', 'Муха', 'Сух', 'Мам', 'Сама', 'Оса', 'Мухомор'],
};

export { PropsDefault };
