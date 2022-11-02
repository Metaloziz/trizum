import { ResponseOneUserGroupT } from 'app/types/UserTypes';

export const findActiveClassGroup = (
  groupsCurrentUser?: ResponseOneUserGroupT[],
): ResponseOneUserGroupT | null => {
  if (groupsCurrentUser) {
    const classGroup = groupsCurrentUser.filter(
      group => group.groupType === 'class' && group.userGroupStatus === 'active',
    );
    return classGroup[0];
  }
  return null;
};
