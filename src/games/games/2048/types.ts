import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  size?: number;
  startTiles?: number;
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  size: 4,
  startTiles: 2
};

export {
  PropsDefault
};
