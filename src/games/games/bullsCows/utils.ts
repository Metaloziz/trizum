export const getLabelBulls = (value: number) => {
  if (value === 0 || value >= 5) {
    return 'быков';
  }
  if (value > 1 && value <= 4) {
    return 'быка';
  }
  return 'бык';
};

export const getLabelCows = (value: number) => {
  if (value === 0 || value >= 5) {
    return 'коров';
  }
  if (value > 1 && value <= 4) {
    return 'коровы';
  }
  return 'корова';
};
