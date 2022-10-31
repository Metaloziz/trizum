import authService from 'app/services/authService';
import groupsService from 'app/services/groupsService';
import usersStore from 'app/stores/usersStore';
import { RequestRegister } from 'app/types/AuthTypes';

export const action = async (
  newUserData: RequestRegister,
  onCloseModal: (value: boolean) => void,
) => {
  const { currentUser, createParenting } = usersStore;
  const { addUserGroup } = groupsService;

  // const response = await createUser(newUserData);
  const child = await authService.register(newUserData);

  if (child && typeof child !== 'string' && currentUser?.id && newUserData.groupId) {
    await addUserGroup({ userId: child.id, groupId: newUserData.groupId });
    const parenting = await createParenting({
      childId: child.id,
      parentId: currentUser.id,
      isMain: false,
    });

    // добавление ребенка к родителю в стор
    if (currentUser.children && parenting) {
      currentUser.children = [
        ...currentUser.children,
        {
          id: parenting.id,
          childId: child.id,
          middleName: child.middleName,
          firstName: child.firstName,
          lastName: child.lastName,
          main: child.main,
        },
      ];
    }

    onCloseModal(false);
  }
};
