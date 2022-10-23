export const getNextWeek = (count: number): Date => {
  let result: Date;

  const now = new Date();

  const plusWeekDays = count === 0 ? 0 : 7 * count;

  if (now.getMonth() === 11) {
    result = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    result = new Date(now.getFullYear(), now.getMonth(), now.getDate() + plusWeekDays);
  }

  return result;
};
