import { PlayResultsResponseT } from 'app/types/GameTypes';
import { days } from 'components/results/mockData/helper/days';
import { getDataForLine } from 'components/results/mockData/helper/getDataForLine';

export const getConfig = (playResults: PlayResultsResponseT) => {
  const Utils = {
    CHART_COLORS: {
      blue: '#00eaff',
      yellow: '#006eff',
      red: '#ffffff',
    },
  };

  let width: any;
  let height: any;
  let gradient: any;

  function getGradient(ctx: any, chartArea: any) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, Utils.CHART_COLORS.blue);
      // gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow);
      // gradient.addColorStop(1, Utils.CHART_COLORS.red);
    }

    return gradient;
  }

  const MONOTONE = 'monotone' as const;
  const data = getDataForLine(playResults);

  const labels = days({ count: data.length });

  const labels2 = labels.map(day => day + '.11');

  return {
    type: 'line',
    data: {
      labels: labels2,
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
          cubicInterpolationMode: MONOTONE,
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
