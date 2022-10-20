import { ScheduleT } from 'app/types/ScheduleT';
import moment from 'moment';
import { DateTime } from 'app/enums/DateTime';

export const now = new Date().toLocaleDateString();

export const getClosestLessonDate = (schedule: ScheduleT[], value: string) => {
  if (!schedule.length) {
    return undefined;
  }

  const valueDate = moment(value, DateTime.DdMmYyyy).toDate();
  const laterThanValue = schedule.filter(
    el => moment(el.date, DateTime.DdMmYyyy).toDate() > valueDate,
  );
  if (laterThanValue.length) {
    const sorted = laterThanValue.sort((a, b) =>
      moment(a.date, DateTime.DdMmYyyy).toDate() > moment(b.date, DateTime.DdMmYyyy).toDate()
        ? 1
        : -1,
    );
    return sorted[0];
  }

  return undefined;
};
