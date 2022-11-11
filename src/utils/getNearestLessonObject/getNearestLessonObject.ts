import { ScheduleT, ShortScheduleT } from 'app/types/ScheduleT';
import { getNearestDateHelper } from './helper/getNearestDateHelper';

export const getNearestLessonObject = (
  schedule: ScheduleT[],
  currentDate: ShortScheduleT,
): ScheduleT | null => {
  function compareDates(a: ScheduleT, b: ScheduleT) {
    const aDate = a.date.split('.').reverse().join('');
    const bDate = b.date.split('.').reverse().join('');
    if (aDate === bDate) {
      const aTime = a.from.split(':').join('');
      const bTime = b.from.split(':').join('');
      return Number(aTime) - Number(bTime);
    }
    return Number(aDate) - Number(bDate);
  }

  const sortedSchedule = schedule.sort(compareDates); // сортируем уроки по дате и времени

  const nearestLessonsByTime = sortedSchedule
    .filter(el => el.date === currentDate.date)
    .find(el => el.from >= currentDate.from); // находим массив уроков, запланированных на текущий день и валидных по времени

  const nearestLessonsInTheFuture = getNearestDateHelper(sortedSchedule);

  if (nearestLessonsByTime) return nearestLessonsByTime; // возвращаем сегодняшний урок

  if (nearestLessonsInTheFuture) return nearestLessonsInTheFuture; // возвращаем урок в будущем

  return null; // если ничего не нашли
};
