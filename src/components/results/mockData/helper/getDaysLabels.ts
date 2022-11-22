export function getDaysLabels(start: string, count: number): string[] {
  const result = [];
  const firstDay = new Date(start);

  result.push(firstDay.toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' }));

  for (let i = 1; i <= count; i++) {
    const nextDayMls = firstDay.setUTCDate(firstDay.getUTCDate() + 1);

    const nextDay = new Date(nextDayMls).toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' });

    result.push(nextDay);
  }

  return result;
}
