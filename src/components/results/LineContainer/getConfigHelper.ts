import { PlayResultsResponseT } from 'app/types/GameTypes';

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

export function getGradient(ctx: any, chartArea: any) {
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

export const getLimitsDays = (playResult: PlayResultsResponseT) => {
  const end = playResult.items[0].createdAt.date.split(' ')[0];
  const start = playResult.items[playResult.items.length - 1].createdAt.date.split(' ')[0];

  return { start, end };
};
