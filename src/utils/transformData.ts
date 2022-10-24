export const transformDate = (date: string | undefined) => {
  if (date) {
    return new Date(date).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });
  }
  return '';
};
