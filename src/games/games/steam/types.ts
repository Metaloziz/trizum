import { GameProps, GameResult } from '../../common/types';

export interface PropGage {
  area: boolean; // Область нажатия true - 1/6 или false - 1/8
  speed: number; // Миллисекунд в 1 обороте
}

export interface Props extends GameProps {
  timeComplete?: number; // Время на уровень
  elementsTotal?: number; // Всего успехов
  errorAacceptable?: number; // Штраф за ошибку
  gage?: PropGage[];
  onEnd?(result?: GameResult): void;
}

const PropsDefault : Props = {
  width: 200,
  timeComplete : 10,
  elementsTotal : 5,
  errorAacceptable : 1,
  gage : [
    {
      area : true,
      speed : 1000
    },
    {
      area : false,
      speed : 4000
    }
  ]
};

export {
  PropsDefault
};
