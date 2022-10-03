import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  elementsTotal?: number
  colors?: number;
  colorsMap?: string[];
  onEnd(result?: GameResult): void;
}

const PropsDefault : Props = {
  elementsTotal: 3,
  colors : 1,
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
