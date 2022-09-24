import Avatar from 'public/img/avatarDefault.png';
import { BASE_URL } from 'constants/constants';

export const getAvatarImage = (path: string | undefined | null) => {
  if (path) {
    return `${BASE_URL}${path}`;
  }

  return Avatar;
};
