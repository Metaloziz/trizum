import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const getIsBetweenDate = (date: string, start: string, end: string) =>
  dayjs(date).isBetween(start, end, 'day', '[]');
