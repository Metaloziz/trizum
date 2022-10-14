import { Moment } from 'moment/moment';

export const getNextDay = (date: Moment) => {
  const day = new Date(date.format());

  const nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);

  // DD.MM.YYYY
  return nextDay.toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });
};
