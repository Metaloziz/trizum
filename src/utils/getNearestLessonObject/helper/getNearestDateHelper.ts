import { ScheduleT } from '../../../app/types/ScheduleT';
import { coverDateString } from './coverDateString';

export const getNearestDateHelper = (array: ScheduleT[]): ScheduleT | null => {
  const now = new Date();

  let resultObject: ScheduleT | null = null;
  let closest = Infinity;

  array.forEach(d => {
    const newDateFormat = coverDateString(d.date);

    const date = new Date(newDateFormat);
    // @ts-ignore
    if (date >= now && (date < new Date(closest) || date < closest)) {
      // @ts-ignore
      closest = d.date;
      resultObject = d;
    }
  });

  return resultObject;
};
