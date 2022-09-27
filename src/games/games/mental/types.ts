import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  delay?: number;
  requiredFormulas?: string[];
  allowedFormulas?: string[];
  min?: number;
  max?: number;
  subtract?: boolean;
  restriction?: boolean;
  length?: number;
  count?: number;
  optional?: number;

  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  delay : 1000,
  requiredFormulas: [],
  allowedFormulas: [],
  min: 1,
  max: 999,
  subtract: true,
  restriction: false,
  length: 3,
  count: 3,
  optional: 0
};

export {
  PropsDefault
};
