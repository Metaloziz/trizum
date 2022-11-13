const date = new Date();
export const getMaxMinYear = (year: number) =>
  `${date.getDay() + 1}-${date.getMonth() + 1}-${new Date().getFullYear() - year}`;
export const maxBirthdayYearStudent = `${new Date().getFullYear() - 3}`;
export const minBirthdayYearStudent = new Date().getFullYear() - 17;
export const maxBirthdayYearAll = new Date().getFullYear() - 18;
export const minBirthdayYear = new Date().getFullYear() - 102;
