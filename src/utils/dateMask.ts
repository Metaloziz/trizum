const date = new Date();
export const getMaxMinYear = (year: number) =>
  `${date.getDay() + 1}-${date.getMonth() + 1}-${new Date().getFullYear() - year}`;
