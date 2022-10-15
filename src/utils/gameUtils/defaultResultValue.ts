import { RESULT, ResultT } from 'app/types/GameTypes';
import Result from 'pages/testing/result/Result';

export const defaultResult = {
  time: 0,
  timeDiff: 0,
  score: 0,
  success: 0,
  failed: 0,
  result: 'end' as ResultT,
};
