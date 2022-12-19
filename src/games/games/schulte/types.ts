import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal: number;
  timeComplete?: number;
  digitMin: number; // Минимальное число на поле
  colorsMap: string[];
  onEnd(result?: GameResult): void;
  perSuccessLevel: number;
  maxErrorLevel: number;
  upgrade: number;
  onRef: any;
}

export interface NeedItem {
  text: string;
  color: string;
}

export interface GameStatistic {
  elementsTotal: number;
  time: number;
}

export interface GenLayout {
  elementsTotal: number;
  digitMin: number;
  colorsMap: string[];
}

const PropsDefault: Props = {
  timeComplete: 0,
  elementsTotal: 3,
  digitMin: 1,
  colorsMap: ['#333', '#f00', '#0f0'],
  width: 200,
  onEnd: () => {},
  perSuccessLevel: 4,
  maxErrorLevel: 3,
  upgrade: 1,
  onRef: () => {},
};

export { PropsDefault };
