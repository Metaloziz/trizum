import { colorThemeStatistic } from 'components/olympiad-page/components/statistics-list/statistics-list/statistics-item/StatisticsItem';

export class StatisticsItemProps {
  id: string = '';

  gameTitle: string = '';

  presetTitle: string = '';

  minutesLeft: number = 0;

  minutesTotal: number = 0;

  percentCompleted: number = 0;

  colorTheme: colorThemeStatistic = colorThemeStatistic.blue;
}
