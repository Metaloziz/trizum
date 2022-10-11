import { WorkTypes } from 'app/enums/WorkTypes';

export interface HomeworkViewModel {
  id: string;
  title: string;
  text: string; // TODO: тут объект, подумать как его выводить
  gamePresets: string[];
  type: WorkTypes;
  status: string;
  gamePresetsCount: number;
}
