export const removeKeysWithSameValues = (newData: any, oldData: any) => {
  const result = {};

  for (const resultKey in newData) {
    if (newData[resultKey] !== oldData[resultKey]) {
      if (resultKey === 'birthdate') {
        const oldBirthdateDate = new Date(newData[resultKey]).toLocaleDateString();
        const newBirthdateDate = new Date(oldData[resultKey].date).toLocaleDateString();

        if (oldBirthdateDate !== newBirthdateDate) {
          // @ts-ignore
          result[resultKey] = newData[resultKey];
        }
      } else {
        // @ts-ignore
        result[resultKey] = newData[resultKey];
      }
    }
  }

  // if (newData.tariff.id !== oldData.tariffId) { // todo доделать лишнюю отправкю
  //  тарифа
  //   // @ts-ignore
  //   result.tariffId = newData.tariff.id;
  // }

  return result;
};
