import { ResponseGroups } from 'app/types/GroupTypes';
import { toJS } from 'mobx';

export const filterStartDateAndAnnounceDate = (groups: ResponseGroups[]) => {
  const currentDateValue = new Date().valueOf();

  const filterGroups: ResponseGroups[] = [];

  groups.forEach(group => {
    const { startedAt, schedule } = group;
    const announceDateValue = new Date(startedAt.date).valueOf();
    let startDateValue: number;

    if (schedule.homeworks.length !== 0) {
      startDateValue = new Date(schedule.homeworks[0].start).valueOf();
    } else {
      startDateValue = 0;
    }

    if (currentDateValue < startDateValue && currentDateValue > announceDateValue) {
      filterGroups.push(toJS(group));
    }
  });
  return filterGroups;
};
