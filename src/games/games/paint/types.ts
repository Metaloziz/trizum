import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number; // Время на прохождение
  elementsTotal: number; // Всего успехов
  digitMax: number;
  onEnd?(result?: GameResult): void;
  onRef: any;
  perSuccessLevel: number;
  maxErrorLevel: number;
  upgrade: number;
  downgrade: number;
}

export interface GameItem {
  id: number;
  image: string;
  mask: string;
}

export interface GameStatistic {
  time: number;
  elements: number;
  variants: number;
}

const PropsDefault: Props = {
  width: 200,
  timeComplete: 10,
  elementsTotal: 2,
  digitMax: 4,
  perSuccessLevel: 3,
  maxErrorLevel: 1,
  onRef: () => {},
  upgrade: 1,
  downgrade: 2,
};

export { PropsDefault };
