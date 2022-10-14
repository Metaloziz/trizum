import { arrayShuffle } from '../../../common/utils';

import { Props } from '../types';

export function generateLayout(props : any) {
  const {
    elementsTotal= 3,
    groupsCount = 1,
    colorsMap = []
  } : Props = props;

  const size =  elementsTotal * elementsTotal;
  const maxSizeColor = Math.ceil(size / groupsCount);
  const resultMap = [];

  for(let i = 0;i<groupsCount;i++) {
    for(let c = 0;c<maxSizeColor;c++) {
      const number = c+1;

      resultMap.push({
        text : `${number}`,
        color : colorsMap[i] || '#000'
      });
    }
  }

  const normalizeMap = arrayShuffle(resultMap.slice(0, size));
  const result = [];

  for(let i = 0;i<elementsTotal;i++) {
    const row = normalizeMap.slice(i*elementsTotal, (i*elementsTotal) + elementsTotal);

    result.push(row);
  }

  return {
    list : arrayShuffle(normalizeMap),
    layout : result
  };
}
