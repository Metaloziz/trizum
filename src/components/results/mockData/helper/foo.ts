import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import usersStore from 'app/stores/usersStore';
import { toJS } from 'mobx';

const getData = (data: string) => data.slice(0, 10);

export const foo = (numberOfMonth?: number): number[] => {
  const arrOfTimes: number[] = [0];
  let indexArrOfTimes: number = 0;

  const { playResults } = gamesStore;
  const arrayOfItems = toJS(playResults).items;
  // console.log('createdAt', arrayOfItems);

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
