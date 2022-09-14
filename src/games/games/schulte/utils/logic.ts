import { arrayShuffle } from '../../../common/utils';

import { Props } from '../types';

export function generateLayout(props : any) {
  const {
    sizeX = 0,
    sizeY = 0,
    colors = 1,
    colorsMap = []
  } : Props = props;

  const size = sizeX * sizeY;
  const maxSizeColor = Math.ceil(size / colors);
  const resultMap = [];

  for(let i = 0;i<colors;i++) {
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

  for(let i = 0;i<sizeY;i++) {
    const row = normalizeMap.slice(i*sizeX, (i*sizeX) + sizeX);

    result.push(row);
  }

  return {
    list : arrayShuffle(normalizeMap),
    layout : result
  };
}
