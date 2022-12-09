import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  levelMaxCompleted: number;
  blinksCount: number;
  colorsMap: string[];
  sound?: number;
  onEnd?(result?: GameResult): void;
  levelChangeEngine: number;
  errorLevel: number;
  upgradeBlink: number;
  downgradeBlink: number;
  onRef: any
}

export interface LevelStatistic {
  blinksCount: number,
  result: boolean;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 5,
  levelMaxCompleted : 5,
  blinksCount : 2,
  sound : 1,
  colorsMap : [
    '#4b8bf5',
    '#8a7ff3',
    '#ef8884'
  ],
  levelChangeEngine: 1,
  errorLevel: 2,
  upgradeBlink: 1,
  downgradeBlink: 1,
  onRef: () => {}
};

export {
  PropsDefault
};
