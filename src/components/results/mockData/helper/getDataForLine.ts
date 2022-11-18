import { PlayResultsResponseT } from 'app/types/GameTypes';
import { toJS } from 'mobx';

const SEC_PER_MINUTE = 60;

export const getDataForLine = (playResults: PlayResultsResponseT): number[] => {
  const getData = (data: string) => data.slice(8, 10);
  const arrayOfItems = playResults.items;

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  const dateObject = new Date(arrayOfItems[0].createdAt.date);
  const currentYear = dateObject.getFullYear();
  const currentMonth = dateObject.getMonth() + 1;

  const countOfDays = getDaysInMonth(currentYear, currentMonth);

  console.log('arrOfTimes', toJS(playResults));

  const arrOfTimes: number[] = new Array(countOfDays).fill(0, 0, countOfDays);

  arrayOfItems.forEach((item, index, array) => {
    const currentDate = Number(getData(item.createdAt.date));

    arrOfTimes[currentDate - 1] += item.time / SEC_PER_MINUTE;
  });

  console.log('arrOfTimes', arrOfTimes);
  return arrOfTimes;
};
