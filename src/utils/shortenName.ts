export const shortenName = (name: string) => {
  if (name) {
    return name[0].toUpperCase();
  }
  return '';
};
