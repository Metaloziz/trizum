import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  cycleTime: number;
  elementsTotal?: number;
  groupsCount?: number;
  blinksCount?: number;
  perSuccessLevel: number;
  maxErrorLevel: number;
  upgrade: number;
  downgrade: number;
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
  perSuccessLevel: 2,
  maxErrorLevel: 2,
  upgrade: 10,
  downgrade: 5,
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
