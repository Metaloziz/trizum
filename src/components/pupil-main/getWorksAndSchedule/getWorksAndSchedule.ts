import { ScheduleHomeWorksType } from 'app/stores/groupStore';
import { Group, WorkWithIdFromLoadme, ScheduleFromLoadme } from 'app/types/LoadMeTypes';

export const getWorksAndSchedule = (groups: Group[]) => {
  const currentGroup = groups.find(
    group => group.status === 'active' && group.group.course.type === 'class',
  );

  let works: WorkWithIdFromLoadme[] = [];
  let schedule: ScheduleHomeWorksType[] = [];

  if (currentGroup) {
    works = currentGroup.group.course.works ?? [];
    schedule = currentGroup.group.schedule.homeworks ?? [];
  }

  return { works, schedule };
};
