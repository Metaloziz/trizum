import { GameProps, GameResult } from '../../common/types';
import { defaultWords } from './assets';

export interface Props extends GameProps {
  timeComplete: number; // Время на прохождение
  words: string[]; // Cлова
  onEnd?(result?: GameResult): void;
  onRef?: any;
}

export type Board = Record<number, string[]>;

export type Position = {
  x: number, 
  y: number,
}

export type Orientation = "horizontal" | "vertical";

export type WordsPosition = {
  start: Position;
  end: Position;
  word: string;
  orientation: Orientation;
};

export type UserClick = {
  orientation: Orientation,
  position: Position;
  start?: boolean,
  end?: boolean
}

const PropsDefault: Props = {
  width: 200,
  timeComplete: 120,
  words: defaultWords,
};

export { PropsDefault };
