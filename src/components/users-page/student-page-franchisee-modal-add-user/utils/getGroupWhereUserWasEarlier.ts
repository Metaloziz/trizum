import { ResponseOneUserGroupT } from 'app/types/UserTypes';

export const getGroupWhereUserWasEarlier = (groups: ResponseOneUserGroupT[], newGroupId: string) =>
  groups.find(group => group.groupId === newGroupId);
