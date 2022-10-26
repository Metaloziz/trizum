import {
  SteamAreaVariant
} from "../../../components/game-page/GameCommon/GameSettings/SteamEngine";
import { GameProps, GameResult } from '../../common/types';

export interface Props extends GameProps {
  timeComplete?: number; // Время на уровень
  elementsTotal?: number; // Всего успехов
  errorAacceptable?: number; // Штраф за ошибку
  speed?: number; // Скорость кручения, оборотов в секунду
  groupsCount?: number; // Кол-во манометров
  onEnd?(result?: GameResult): void;
  area: string // размер красной зоны. 1/6 или 1/8
}

const PropsDefault : Props = {
  width: 200,
  timeComplete : 10,
  elementsTotal : 5,
  errorAacceptable : 1,
  speed : 1,
  groupsCount : 1,
  area: SteamAreaVariant.oneSix
};

export {
  PropsDefault
};
