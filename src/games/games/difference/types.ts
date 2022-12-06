import { GameProps } from '../../common/types';

export type Point = {
  x: number;
  y: number;
};

export type Area = {
  width: number;
  height: number;
};

export interface Props extends GameProps {
  timeComplete?: number;
  errorAacceptable?: number;
  pictures?: string[];
}

const PropsDefault: Props = {
  width: 200,
  timeComplete: 60,
  errorAacceptable: 10,
  pictures: [],
};

export { PropsDefault };
