import appStore from 'app/stores/appStore';
import gamesStore from 'app/stores/gamesStore';
import { days } from 'components/results/mockData/helper/days';
import { foo } from 'components/results/mockData/helper/foo';
import styles from 'components/results/Results.module.scss';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

export const LineContainer: FC = observer(() => {
  const { user } = appStore;
  const { playResults, getPlayResults } = gamesStore;

  useEffect(() => {
    getPlayResults(user.id);
  }, []);

  /// ///////////////
  const Utils = {
    CHART_COLORS: {
      blue: '#00eaff',
      yellow: '#00eaff',
      red: '#00eaff',
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
  const labels = days({ count: foo(playResults).length });

  const config = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Затраченное время',
          // backgroundColor: 'red',
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
          data: foo(playResults),
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
            color() {
              return '#fff';
            },
          },
          ticks: {
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
  /// ///////////////

  console.log('playResults', playResults);

  return <div>{playResults && <Line className={styles.canvas} {...config} />}</div>;
});
