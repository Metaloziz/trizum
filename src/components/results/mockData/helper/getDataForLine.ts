import { PlayResultsResponseT } from 'app/types/GameTypes';
import { toJS } from 'mobx';
import { getDaysCount } from 'utils/getDaysCount';

const SEC_PER_MINUTE = 60;

export const getDataForLine = (
  playResults: PlayResultsResponseT,
  daysLabels: string[],
): number[] => {
  const arrOfTimes: number[] = new Array(daysLabels.length).fill(0);

  playResults.items.forEach(result => {
    const date = result.createdAt.date.split(' ')[0].split('-').reverse().join('.');

    const currentIndex = daysLabels.indexOf(date);
    if (currentIndex >= 0) {
      arrOfTimes[currentIndex] = result.time;
    }
  });

  const getData = (data: string) => data.slice(8, 10);
  const arrayOfItems = playResults.items;

  const start = playResults.items[0].createdAt.date.split(' ')[0];
  const end = playResults.items[playResults.items.length - 1].createdAt.date.split(' ')[0];

  console.log('startend', toJS([end, start]));

  const daysCount = getDaysCount(end, start);

  console.log('arrOfTimes', toJS(playResults));

  console.log('daysCount', toJS(daysCount));

  arrayOfItems.forEach(item => {
    const currentDate = Number(getData(item.createdAt.date));

    arrOfTimes[currentDate - 1] += item.time / SEC_PER_MINUTE;
  });

  console.log('arrOfTimes', arrOfTimes);
  return arrOfTimes;
};
