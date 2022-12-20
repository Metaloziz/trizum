import { arrayShuffle } from '../../../common/utils';

import { GenLayout } from '../types';

export function generateLayout({ elementsTotal = 3, digitMin = 1, colorsMap = [] }: GenLayout) {
  const size = elementsTotal * elementsTotal;
  const maxSizeColor = Math.ceil(size / colorsMap.length);
  const resultMap = [];

  for (let i = 0; i < colorsMap.length; i++) {
    for (let c = 0; c < maxSizeColor; c++) {
      const number = c + 1 + (digitMin - 1);

      resultMap.push({
        text: `${number}`,
        color: colorsMap[i] || '#000',
      });
    }
  }

  const normalizeMap = arrayShuffle(resultMap.slice(0, size));
  const result = [];

  for (let i = 0; i < elementsTotal; i++) {
    const row = normalizeMap.slice(i * elementsTotal, i * elementsTotal + elementsTotal);

    result.push(row);
  }

  return {
    list: arrayShuffle(normalizeMap),
    layout: result,
  };
}
