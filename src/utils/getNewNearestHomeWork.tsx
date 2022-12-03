import { ScheduleHomeWorksType } from 'app/stores/groupStore';

export const getNewNearestHomeWork = (arr: ScheduleHomeWorksType[]) => {
  const defaultIndex = -1;

  for (let i = 0; i < arr.length; i++) {
    const { start, end, index } = arr[i];

    if (new Date(start).getTime() >= Date.now() && Date.now() <= new Date(end).getTime())
      return index;
  }

  return defaultIndex;
};
