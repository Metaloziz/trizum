import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  cycleTime: number;
  elementsTotal?: number;
  groupsCount?: number;
  blinksCount?: number;
  percentUpgradeTime: number;
  percentDowngradeTime: number;
  levelChangeEngine: number;
  errorLevel: number;

  onEnd?(result?: GameResult): void;
  onRef: any;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 0,
  cycleTime : 5000,
  elementsTotal: 2,
  groupsCount: 2,
  blinksCount: 2,
  percentUpgradeTime: 10,
  percentDowngradeTime: 5,
  levelChangeEngine: 2,
  errorLevel: 2,
  onRef: () => {}
};

export type Result = {
  failed: number,
  result: "failed"|"success"|"end",
  success: number
}

export type StatisticItem = {
  result: boolean,
  time: number,
}


export {
  PropsDefault
};
