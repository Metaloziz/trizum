import { PersonalRecordT } from 'app/types/ResponseLoadMeBaseT';

export type PersonalRecordsArrT = {
  title: string;
  type: string;
  value: number;
  color?: string;
  id: number;
};
export const personalRecordsArr = (records: PersonalRecordT): PersonalRecordsArrT[] => [
  {
    title: 'Логика',
    type: 'logic',
    value: records.logic,
    color: 'red',
    id: +new Date().toDateString(),
  },
  {
    title: 'Мышление',
    type: 'mind',
    value: records?.mind,
    id: +new Date().toDateString(),
    color: 'violet',
  },
  {
    title: 'Внимание',
    type: 'attention',
    color: 'aquamarine',
    id: +new Date().toDateString(),
    value: records?.attention,
  },
  {
    title: 'Концентрация',
    type: 'vision',
    color: 'yellow',
    id: +new Date().toDateString(),
    value: records?.vision,
  },
  {
    title: 'Память',
    type: 'memory',
    value: records?.memory,
    color: 'yellow',
    id: +new Date().toDateString(),
  },
];
