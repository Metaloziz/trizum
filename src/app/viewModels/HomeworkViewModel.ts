import { GamePresetT } from 'app/types/GameTypes';

export interface HomeworkViewModel {
  id?: string;
  title: string;
  text: string; // TODO: тут объект, подумать как его выводить
  type: string;
  gamePresets: GamePresetT[];
  status: string;
}
