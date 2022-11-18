import { PlayResultsResponseT } from 'app/types/GameTypes';
import { toJS } from 'mobx';

export const foo = (playResults: PlayResultsResponseT): number[] => {
  console.log('playResults', toJS(playResults));

  const getData = (data: string) => data.slice(0, 10);

  const arrOfTimes: number[] = [0];
  let indexArrOfTimes: number = 0;

  const arrayOfItems = playResults.items;

  // console.log('arrayOfItems', arrayOfItems);

  arrayOfItems.forEach((item, index, array) => {
    const currentDate = getData(item.createdAt.date);
    const previousDate = index === 0 ? currentDate : getData(array[index - 1].createdAt.date);

    console.log('created', previousDate);

    if (currentDate === previousDate) {
      arrOfTimes[indexArrOfTimes] += item.time;
    } else {
      indexArrOfTimes++;
      arrOfTimes[indexArrOfTimes] = item.time;
    }
  });
  console.log('createdAt', arrOfTimes);
  return arrOfTimes;
};
