import { GameTypeTitle } from 'app/enums/gameTypeTitle';
import { PersonalRecordT } from 'app/types/ResponseLoadMeBaseT';

export type PersonalRecordsArrT = {
  title: string;
  type: keyof typeof GameTypeTitle;
  percents: number;
  color?: string;
  id: number;
};

export const personalRecordsArr = (records: PersonalRecordT): PersonalRecordsArrT[] => [
  {
    title: GameTypeTitle.logic,
    type: 'logic',
    percents: records?.logic,
    color: 'red',
    id: +new Date().toDateString(),
  },
  {
    title: GameTypeTitle.mind,
    type: 'mind',
    percents: records?.mind,
    id: +new Date().toDateString(),
    color: 'violet',
  },
  {
    title: GameTypeTitle.attention,
    type: 'attention',
    color: 'aquamarine',
    id: +new Date().toDateString(),
    percents: records?.attention,
  },
  {
    title: GameTypeTitle.vision,
    type: 'vision',
    color: 'yellow',
    id: +new Date().toDateString(),
    percents: records?.vision,
  },
  {
    title: GameTypeTitle.memory,
    type: 'memory',
    percents: records?.memory,
    color: 'yellow',
    id: +new Date().toDateString(),
  },
];
