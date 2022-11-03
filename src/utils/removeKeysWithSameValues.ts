export const removeKeysWithSameValues = (newData: any, oldData: any): any => {
  const dataForUpdate = {};

  for (const resultKey in newData) {
    if (newData[resultKey] !== oldData[resultKey]) {
      switch (resultKey) {
        case 'birthdate':
          if (
            new Date(newData.birthdate).toLocaleDateString() !==
            new Date(oldData.birthdate.date).toLocaleDateString()
          ) {
            // @ts-ignore
            dataForUpdate[resultKey] = newData[resultKey];
          }
          break;
        case 'tariffId':
          if (newData[resultKey] !== oldData.tariff.id) {
            // @ts-ignore
            dataForUpdate[resultKey] = newData[resultKey];
          }
          break;
        case 'groupId':
          if (newData[resultKey] !== oldData?.groups[0]?.groupId) {
            // @ts-ignore
            dataForUpdate[resultKey] = newData[resultKey];
          }
          break;
        default:
          // @ts-ignore
          dataForUpdate[resultKey] = newData[resultKey];
          break;
      }
    }
  }

  return dataForUpdate;
};
