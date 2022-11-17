import { ScheduleT } from 'app/types/ScheduleT';

export const dateNow = (): Omit<ScheduleT, 'name' | 'to'> => {
  const todayDate = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }).toString();

  const date = todayDate.slice(0, 10);

  const from = todayDate.slice(12, 17);

  return {
    date,
    from,
  };
};
