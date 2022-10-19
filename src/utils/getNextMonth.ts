export const getNextMonth = () => {
  let result: Date;

  const now = new Date();
  if (now.getMonth() === 11) {
    result = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    result = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
  }

  return result;
};
