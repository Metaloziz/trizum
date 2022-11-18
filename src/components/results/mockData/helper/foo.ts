import appStore from 'app/stores/appStore';
import usersStore from 'app/stores/usersStore';
import { toJS } from 'mobx';

export const foo = (): number[] => {
  const { user } = appStore;

  // console.log(currentUser?.groups);
  console.log('asd', toJS(user));

  return [1, 10, 45, 93, 2];
};
