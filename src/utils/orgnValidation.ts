export const orgnValidation = (value: number): boolean => {
  const valueToString = value ? value.toString() : '';
  if (valueToString.length === 15) {
    const num14 = Math.floor((value / 10) % 13);
    const dgt15 = num14 % 10;
    return parseInt(value.toString()[14], 10) === dgt15;
  }
  if (valueToString.length === 13) {
    const num12 = Math.floor((value / 10) % 11);
    const dgt13 = num12 === 10 ? 0 : num12;
    return parseInt(valueToString[12], 10) === dgt13;
  }
  return false;
};
