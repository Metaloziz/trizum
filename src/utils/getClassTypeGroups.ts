import { GroupsDataT } from 'app/types/ResponseLoadMeBaseT';
import { ScheduleT } from 'app/types/ScheduleT';

export const getClassTypeGroups = (data: GroupsDataT[]): ScheduleT[] => {
  const draft = data.filter(el => el.group.type === 'class');

  const newArr: ScheduleT[] = [];

  draft.forEach(el => {
    newArr.push(...el.group.schedule);
  });

  // console.log('getClassTypeGroups', [newArr]);
  return newArr;
};
