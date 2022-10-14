import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  cycleTime?: number;
  elementsTotal?: number;
  groupsCount?: number;
  blinksCount?: number;

  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 10000,
  cycleTime : 5,
  elementsTotal: 2,
  groupsCount: 2,
  blinksCount: 2
};

export {
  PropsDefault
};
