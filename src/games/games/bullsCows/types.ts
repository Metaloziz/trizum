import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  levelMaxCompleted?: number;
  errorAacceptable?: number;
  digitMax?: number;
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width : 200,
  timeComplete : 120,
  levelMaxCompleted: 2,
  errorAacceptable: 10,
  digitMax: 4
};

export {
  PropsDefault
};
