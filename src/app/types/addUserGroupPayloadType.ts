import { UserGroupStatus } from 'app/enums/UserGroupStatus';

export type AddUserGroupPayloadType = {
  userId: string;
  groupId: string;
  status?: UserGroupStatus;
};
