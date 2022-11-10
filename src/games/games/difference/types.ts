import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number;
  errorAacceptable? : number,
  pictures?: string[];
}

const PropsDefault: Props = {
  width: 200,
  timeComplete: 60000,
  errorAacceptable: 10,
  pictures: [],
};

export { PropsDefault };
