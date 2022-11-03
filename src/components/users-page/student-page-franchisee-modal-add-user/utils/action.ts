import { UserGroupStatus } from 'app/enums/UserGroupStatus';
import { Roles } from 'app/stores/appStore';
import groupStore from 'app/stores/groupStore';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';
import { ResponseOneUser } from 'app/types/UserTypes';
import { isStudentTeacherEducation } from 'components/users-page/student-page-franchisee-modal-add-user/utils/isStudentTeacherEducation';
import { Dispatch, SetStateAction } from 'react';
import { findActiveClassGroup } from 'utils/findActiveClassGroup';
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
  const { addUserGroup, editUserGroup } = groupStore;

  const IS_ADD_MOD = !user;

  if (IS_ADD_MOD) {
    if (!roleCode) {
      setError('role', {
        type: 'manual',
        message: 'выберите роль',
      });
      return;
    }

    // if (isMethodistTutor(role)) {
    //   if (!franchise) {
    //     setError('franchise', {
    //       type: 'manual',
    //       message: 'выберите франшизу',
    //     });
    //     return;
    //   }
    // }

    if (role === Roles.Student) {
      if (!tariff) {
        setError('tariff', {
          type: 'manual',
          message: 'выберите тариф',
        });
        return;
      }
    }
    if (isStudentTeacherEducation(role)) {
      if (!groupId) {
        setError('group', {
          type: 'manual',
          message: 'выберите группу',
        });
        return;
      }
    }
  }

  let response;

  // редактирование пользователя
  if (user) {
    const memoData = removeKeysWithSameValues(newUserData, user);

    // если есть новый ID группы, то нужно удалить старую и создать новую зависимость
    if (memoData.groupId) {
      const oldClassGroup = findActiveClassGroup(user?.groups);

      editUserGroup({ status: UserGroupStatus.suspended }, oldClassGroup!.userGroupId);
      addUserGroup({ userId: memoData.userId, groupId: memoData.groupId });

      // todo доделать остановился 02.11
    }

    response = await updateUser(memoData, user.id);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      return;
    }
    // создание пользователя
  } else {
    response = await createUser(newUserData);
    if (typeof response === 'string') {
      setErrorFormMessage(response, setError);
      return;
    }
  }

  if (response) {
    if (isStudentTeacherEducation(role)) {
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
