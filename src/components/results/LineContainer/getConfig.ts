import { PlayResultsResponseT } from 'app/types/GameTypes';
import { getGradient, getLimitsDays } from 'components/results/LineContainer/getConfigHelper';
import { getDataForLine } from 'components/results/mockData/helper/getDataForLine';
import { getDaysLabels } from 'components/results/mockData/helper/getDaysLabels';
import { getDaysCount } from 'utils/getDaysCount';

export const getConfig = (playResults: PlayResultsResponseT) => {
  const { start, end } = getLimitsDays(playResults);

  const daysCount = getDaysCount(start, end);

  const labels = getDaysLabels(start, daysCount);
  const data = getDataForLine(playResults, labels);

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: ' Затраченное время учёбу, мин/день ',
          borderWidth: 2,
          pointRadius: 5,
          borderColor(context: any) {
            const { chart } = context;
            const { ctx, chartArea } = chart;

            if (!chartArea) {
              // This case happens on initial chart load
              return;
            }
            // eslint-disable-next-line consistent-return
            return getGradient(ctx, chartArea);
          },
          data,
        },
      ],
    },
    options: {
      font: {
        family: 'Montserrat',
        size: 12,
        weight: '800',
      },
      scales: {
        x: {
          grid: {
            color() {
              return '#fff';
            },
          },
          ticks: {
            // color: '#524f4f',
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [2, 2],
          },
          ticks: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
        },
      },
      backgroundColor: '',
    },
  };
};
