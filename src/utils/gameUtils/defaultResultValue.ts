import { ResultsNewT, ResultT } from 'app/types/GameTypes';

export const defaultResult = {
  time: 0,
  timeDiff: 0,
  score: 0,
  success: 0,
  failed: 0,
  result: 'end' as ResultT,
};

export const newDefaultResult: ResultsNewT = {
  gameCode: '',
  time: 0,
  result: 'end' as ResultT,
  success: 0,
  templateCode: 1,
};
