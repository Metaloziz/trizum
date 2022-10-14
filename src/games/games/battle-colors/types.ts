import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  elementsTotal?: number;
  blinksCount?: number;

  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 60,
  elementsTotal: 2,
  blinksCount: 2
};

export {
  PropsDefault
};
