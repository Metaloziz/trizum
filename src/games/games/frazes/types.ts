import { GameProps, GameResult } from '../../common/types';
import { defaultWords } from './assets/words';

export interface Props extends GameProps {
  elementsTotal?: number; // Кол-во угадываний
  errorAacceptable: number; // Кол-во возможных ошибок
  timeComplete: number; // Время на прохождение
  speed: number; // Время на которое появляются слова в милисекундах
  wordsFull: boolean; // Писать слова полностью или две буквы
  words: FrazesDictionary[]; // Cлова
  changeLevelDictionary: number; // Кол-во уровней когда менять словарь
  errorLevel: number; // Кол-во ошибок на уровне
  onEnd?(result?: GameResult): void;
  onRef?: any;
}

export type FrazesDictionary = {
  easy: string,
  normal: string,
  hard: string
}

export type DictionaryType = "easy" | "normal" | "hard"

const PropsDefault: Props = {
  width: 200,
  timeComplete: 120,
  errorAacceptable: 5,
  speed: 2000,
  wordsFull: false,
  words: defaultWords,
  changeLevelDictionary: 3,
  errorLevel: 2,
};

export { PropsDefault };
