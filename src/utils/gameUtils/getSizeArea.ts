import { StatusEnum } from '../../app/enums/StatusTypes';
import { getOptionMui } from '../getOption';

const AREA = {
  '1/6': true,
  '1/8': false,
};
const areaKeys = Object.keys(AREA);
export const getSizeArea = Object.values(AREA).map((el, index) =>
  getOptionMui(String(index), areaKeys[index]),
);
