import { colorThemeStatistic } from 'components/olympiad-page/components/statistics-list/statistics-list/statistics-item/StatisticsItem';

export const getRandomColor = () => {
  const keysArr = Object.keys(colorThemeStatistic);

  const randomIndex = Number(Math.floor(keysArr.length * Math.random()));

  const key = keysArr[randomIndex];

  return colorThemeStatistic[key as keyof typeof colorThemeStatistic];
};
