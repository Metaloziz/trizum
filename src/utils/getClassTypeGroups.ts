import { Group } from 'app/types/LoadMeTypes';
import { ScheduleT } from 'app/types/ScheduleT';

export const getClassTypeGroups = (data: Group[]): ScheduleT[] => {
  const draft = data.filter(el => el.group.type === 'class');

  const newArr: ScheduleT[] = [];

  draft.forEach(el => {
    newArr.push(...el.group.schedule.classworks);
  });

  return newArr;
};
