import { ScheduleHomeWorksType } from 'app/stores/groupStore';
import { Group, WorkWithIdFromLoadme } from 'app/types/LoadMeTypes';

export const getWorksAndSchedule = (groups: Group[]) => {
  const currentGroup = groups.find(
    group =>
      group.status === 'active' &&
      (group.group.course.type === 'class' || group.group.course.type === 'olympiad'),
  );

  let works: WorkWithIdFromLoadme[] = [];
  let schedule: ScheduleHomeWorksType[] = [];

  if (currentGroup) {
    works = currentGroup.group.course.works ?? [];
    schedule = currentGroup.group.schedule.homeworks ?? [];
  }

  return { works, schedule };
};

export const getWorksAndScheduleOnId = (groups: Group[], groupId?: string) => {
  let currentGroup: Group | undefined;

  if (groupId) {
    currentGroup = groups.find(group => group.id === groupId);
  } else {
    currentGroup = groups.find(
      group =>
        group.status === 'active' &&
        (group.group.course.type === 'class' || group.group.course.type === 'olympiad'),
    );
  }

  let works: WorkWithIdFromLoadme[] = [];
  let schedule: ScheduleHomeWorksType[] = [];

  if (currentGroup) {
    works = currentGroup.group.course.works ?? [];
    schedule = currentGroup.group.schedule.homeworks ?? [];
  }

  return { works, schedule };
};
