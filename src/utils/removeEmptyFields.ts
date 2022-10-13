export const removeEmptyFields = (obj: any) => {
  const result: any = {};
  const keysArray = Object.keys(obj);

  keysArray.forEach(key => {
    if (obj[key]) {
      result[key] = obj[key];
    }
    if (key === 'sex') {
      result[key] = obj[key];
    }

    if (key === 'page') {
      result[key] = obj[key];
    }
  });
  return result;
};
