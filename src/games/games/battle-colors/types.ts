import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  time?: number;
  levels?: number;
  colors?: number;

  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  time : 60,
  levels: 2,
  colors: 2
};

export {
  PropsDefault
};
