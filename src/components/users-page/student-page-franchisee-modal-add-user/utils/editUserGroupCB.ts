import { UserGroupStatus } from 'app/enums/UserGroupStatus';
import groupStore from 'app/stores/groupStore';
import usersStore from 'app/stores/usersStore';
import { ResponseOneUser } from 'app/types/UserTypes';
import { getGroupWhereUserWasEarlier } from 'components/users-page/student-page-franchisee-modal-add-user/utils/getGroupWhereUserWasEarlier';
import { findActiveClassGroup } from 'utils/findActiveClassGroup';

export const editUserGroupCB = (user: ResponseOneUser, memoData: any) => {
  const { getFilteredUsers } = usersStore;
  const { addUserGroup, editUserGroup } = groupStore;

  const oldClassGroup = findActiveClassGroup(user?.groups);

  // переводим нынешнюю активную группу в статус suspend
  if (oldClassGroup) {
    editUserGroup({ status: UserGroupStatus.suspended }, oldClassGroup.userGroupId);
  }

  // если студент ранее состоял в новой группе, то изменяем её статус на active
  const oldGroup = getGroupWhereUserWasEarlier(user.groups, memoData.groupId);

  if (oldGroup) {
    editUserGroup({ status: UserGroupStatus.active }, oldGroup.userGroupId);
  } else {
    // иначе создаём новую зависимость
    addUserGroup({ userId: user.id, groupId: memoData.groupId });
  }

  getFilteredUsers();
};
