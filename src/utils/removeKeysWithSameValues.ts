export const removeKeysWithSameValues = (newData: any, oldData: any): any => {
  const dataForUpdate = {};

  for (const resultKey in newData) {
    if (newData[resultKey] !== oldData[resultKey]) {
      switch (resultKey) {
        case 'birthdate':
          // eslint-disable-next-line no-case-declarations
          const oldBirthdateDate = new Date(newData[resultKey]).toLocaleDateString();
          // eslint-disable-next-line no-case-declarations
          const newBirthdateDate = new Date(oldData[resultKey].date).toLocaleDateString();

          if (oldBirthdateDate !== newBirthdateDate) {
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
          if (newData[resultKey] !== oldData.groups[0].groupId) {
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
