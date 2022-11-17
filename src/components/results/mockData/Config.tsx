import { ScriptableScaleContext } from 'chart.js';
import { AnyObject } from 'chart.js/types/basic';

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Utils = {
  CHART_COLORS: {
    blue: '#002bff',
    yellow: '#ffa700',
    red: '#ff0000',
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
    gradient.addColorStop(0.5, Utils.CHART_COLORS.yellow);
    gradient.addColorStop(1, Utils.CHART_COLORS.red);
  }

  return gradient;
}

const MONOTONE = 'monotone' as const;

export const config = {
  data: {
    labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
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
        data: [0, 80, 5, 2, 20, 70, 45, 65, 5, 2, 20, 70, 45, 65],
        cubicInterpolationMode: MONOTONE,
      },
    ],
  },
  options: {
    font: {
      family: 'Montserrat',
      size: 9,
      weight: '400',
    },
    scales: {
      x: {
        grid: {
          color(context: ScriptableScaleContext, options: AnyObject) {
            return '#fff';
          },
        },
        ticks: {
          callback: (e: number | string) => {
            if (typeof e === 'number' && e % 2) {
              return '';
            }
            return e;
          },
          color: '#BABEC6',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2, 2],
        },
        ticks: {
          display: false,
          callback: (e: number | string) => {
            if (typeof e === 'number' && e % 2) {
              return e;
            }
            return '';
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    backgroundColor: '',
  },
};
