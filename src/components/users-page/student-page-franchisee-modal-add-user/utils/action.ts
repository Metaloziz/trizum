import { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import { editUserGroupCB } from 'components/users-page/student-page-franchisee-modal-add-user/utils/editUserGroupCB';
import {
  roleError,
  tariffError,
  groupError,
} from 'components/users-page/student-page-franchisee-modal-add-user/utils/errorObjects';
import { isStudentTeacherEducation } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentTeacherEducation';
import { Dispatch, SetStateAction } from 'react';
import { removeKeysWithSameValues } from 'utils/removeKeysWithSameValues';
import { setErrorFormMessage } from 'utils/setErrorFormMessage';

export const action = async (
  user: ResponseOneUser | undefined,
  newUserData: RequestRegister,
  setError: any,
  role: Roles,
  onCloseModal: () => void,
  reset: () => void,
  setStudentId: Dispatch<SetStateAction<string>>,
  setIsParentShown: Dispatch<SetStateAction<boolean>>,
  roleCode: string,
  franchise: string,
  tariff: string,
  groupId: string,
) => {
  const { createUser, updateUser } = usersStore;
  const { addUserGroup } = groupStore;

  const IS_ADD_MOD = !user;

  if (IS_ADD_MOD) {
    if (!roleCode) {
      setError('role', roleError);
      return;
    }

    if (role === Roles.Student && !tariff) {
      setError('tariff', tariffError);
      return;
    }
    if (isStudentTeacherEducation(role) && !groupId) {
      setError('group', groupError);
      return;
    }
  }

  let response;

  // редактирование пользователя
  if (user) {
    const memoData = removeKeysWithSameValues(newUserData, user);

    // если есть новый ID группы, то нужно удалить старую и создать новую зависимость
    if (memoData.groupId) {
      editUserGroupCB(user, memoData);
    }

    response = await updateUser(memoData, user.id);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      return;
    }
  } else {
    // создание пользователя
    response = await createUser(newUserData);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      return;
    }
    if (response && isStudentTeacherEducation(role)) {
      await addUserGroup({ userId: response.id, groupId });
    }
  }

  if (role !== Roles.Student) {
    onCloseModal();
    reset();
    return;
  }

  if (typeof response === 'object' && 'id' in response) {
    setStudentId(response.id);
    setIsParentShown(true);
  }
};
