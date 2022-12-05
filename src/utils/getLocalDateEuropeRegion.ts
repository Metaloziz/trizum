export const getLocalDateEuropeRegion = (date?: Date) =>
  new Date(date ?? '').toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Moscow',
  });
