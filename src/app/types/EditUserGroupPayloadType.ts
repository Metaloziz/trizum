import { AddUserGroupPayloadType } from 'app/types/addUserGroupPayloadType';

export type EditUserGroupPayloadType = Pick<AddUserGroupPayloadType, 'status'>;
