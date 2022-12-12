import { EmptyUser } from 'app/types/emptyUser';

export const getActiveClassGroup = (user: EmptyUser) =>
  user?.groups.find(
    group =>
      group.status === 'active' &&
      group.group.course.type === 'class' &&
      group.group.course.status === 'active',
  );
