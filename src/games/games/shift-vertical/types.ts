import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  time?: number;
  delay?: number;
  levels?: number;
  colors?: number;
  forms?: number;

  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  time : 10000,
  delay : 5,
  levels: 2,
  colors: 2,
  forms: 2
};

export {
  PropsDefault
};
