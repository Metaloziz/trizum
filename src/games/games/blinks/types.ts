import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  levelMaxCompleted: number;
  blinksCount: number;
  colorsMap: string[];
  sound?: number;
  onEnd?(result?: GameResult): void;
  perSuccessLevel: number;
  maxErrorLevel: number;
  upgrade: number;
  downgrade: number;
  onRef: any;
  digitMax: number;
}

export interface LevelStatistic {
  blinksCount: number;
  result: boolean;
}

const balloons = [
  '#8a80f3',
  '#ef8784',
  '#ff9920',
  '#babec7',
  '#8f806b',
  '#0d6384',
  '#dfff00',
  '#800080',
  '#008080',
  '#ccccff',
];

const PropsDefault: Props = {
  width: 200,
  timeComplete: 5,
  levelMaxCompleted: 5,
  blinksCount: 2,
  sound: 1,
  colorsMap: [
    '#8a80f3',
    '#ef8784',
    '#ff9920',
  ],
  perSuccessLevel: 1,
  maxErrorLevel: 2,
  upgrade: 1,
  downgrade: 1,
  onRef: () => {},
  digitMax: 3,
};

export { PropsDefault, balloons };
