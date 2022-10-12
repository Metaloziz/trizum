import { PersonalRecordT } from 'app/types/ResponseLoadMeBaseT';

export type PersonalRecordsArrT = {
  title: string;
  type: string;
  percents: number;
  color?: string;
  id: number;
};

export const personalRecordsArr = (records: PersonalRecordT): PersonalRecordsArrT[] => [
  {
    title: 'Логика',
    type: 'logic',
    percents: records?.logic,
    color: 'red',
    id: +new Date().toDateString(),
  },
  {
    title: 'Мышление',
    type: 'mind',
    percents: records?.mind,
    id: +new Date().toDateString(),
    color: 'violet',
  },
  {
    title: 'Внимание',
    type: 'attention',
    color: 'aquamarine',
    id: +new Date().toDateString(),
    percents: records?.attention,
  },
  {
    title: 'Концентрация',
    type: 'vision',
    color: 'yellow',
    id: +new Date().toDateString(),
    percents: records?.vision,
  },
  {
    title: 'Память',
    type: 'memory',
    percents: records?.memory,
    color: 'yellow',
    id: +new Date().toDateString(),
  },
];
