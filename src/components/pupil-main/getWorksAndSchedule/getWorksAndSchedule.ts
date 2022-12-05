import { Group, WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';
import { ScheduleHomeWorksType } from 'app/types/scheduleHomeWorksType';

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
