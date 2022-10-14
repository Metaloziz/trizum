export const transformDate = (date: string | undefined) => {
  if (date) {
    return new Date(date).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });
  }
  return '';
};

export const shortenName = (name: string) => {
  if (name) {
    return name[0].toUpperCase();
  }
  return '';
};
