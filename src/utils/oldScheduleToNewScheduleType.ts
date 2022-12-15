import { ResponseGroups } from 'app/types/GroupTypes';
// функция для проверки старого типа  расписания
export const oldScheduleToNewScheduleType = (groups: ResponseGroups[]) =>
  groups.map(group => {
    if (Array.isArray(group.schedule)) {
      group.schedule = {
        classworks: group.schedule,
        homeworks: [],
      };
    }
    return group;
  });
