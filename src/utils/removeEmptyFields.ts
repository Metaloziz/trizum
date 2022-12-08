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

    if (key === 'page' && obj[key]) {
      result[key] = obj[key];
    }

    // так как отчество не обязательное, то его можно удалить
    if (key === 'middleName') {
      result[key] = obj[key];
    }
  });
  return result;
};
