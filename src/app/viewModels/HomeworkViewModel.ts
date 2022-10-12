export interface HomeworkViewModel {
  id: string;
  title: string;
  text: string; // TODO: тут объект, подумать как его выводить
  gamePresets: string[];
  type: string;
  status: string;
  gamePresetsCount: number;
}
