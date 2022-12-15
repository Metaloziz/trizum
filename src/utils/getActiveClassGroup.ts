import { EmptyUser } from 'app/types/emptyUser';
import { Group } from 'app/types/LoadMeTypes';
import { toJS } from 'mobx';

export const getActiveClassGroup = (user: EmptyUser) =>
  user?.groups.find(
    group =>
      group.status === 'active' &&
      group.group.course.type === 'class' &&
      group.group.course.status === 'active',
  );

export const getActiveClassAndOlympiadGroup = (groups: Group[]) => {
  const newGroups = toJS(groups).filter(
    group =>
      group.status === 'active' &&
      (group.group.course.type === 'class' || group.group.course.type === 'olympiad') &&
      group.group.course.status === 'active',
  );

  newGroups.sort((a, b) => (a.group.course.type > b.group.course.type ? 1 : -1));

  return newGroups;
};
