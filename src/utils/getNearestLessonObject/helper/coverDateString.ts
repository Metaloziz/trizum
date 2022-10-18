export const coverDateString = (date: string) => {
  const array = date.split('.');

  return array[1] + '.' + array[0] + '.' + array[2];
};
