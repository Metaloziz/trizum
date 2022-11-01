import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal?: number
  groupsCount?: number;
  timeComplete?: number;
  colorsMap?: string[];
  onEnd(result?: GameResult): void;
}

const PropsDefault : Props = {
  timeComplete: 0,
  elementsTotal: 3,
  groupsCount : 1,
  colorsMap : [
    '#333',
    '#f00',
    '#0f0'
  ],
  width : 200,
  onEnd : () => {}
};

export {
  PropsDefault
};
