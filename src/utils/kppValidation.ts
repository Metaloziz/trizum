export const kppValidation = (value: string, required?: boolean): boolean => {
  const valueToString = value ? value.toString() : '';
  if (valueToString.length !== 9) return false;
  if (!valueToString.match(/\d{4}[\dA-Z][\dA-Z]\d{3}/)) return false;
  return true;
};
