import { StatusTypes } from '../app/enums/StatusTypes';

export const filterGameStatus = (gameId: string, status: string, statusType: JSX.Element[]) => {
  let res;
  if (!gameId) {
    res = statusType.filter(el => el.key === 'draft');
  } else if (status === 'draft') {
    res = statusType.filter(
      el => el.key === 'active' || el.key === 'draft' || el.key === 'archive',
    );
  } else if (status === 'active') {
    res = statusType.filter(el => el.key === 'removal' || el.key === 'active');
  } else if (status === 'removal') {
    res = statusType.filter(el => el.key === 'archive' || el.key === 'removal');
  } else if (status === 'archive') {
    res = statusType.filter(el => el.key === 'archive');
  } else {
    res = statusType;
  }
  return res;
};
