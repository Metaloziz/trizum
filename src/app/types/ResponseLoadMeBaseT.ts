import { AvatarT } from 'app/types/AvatarT';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { ResponseOneGroup } from 'app/types/GroupTypes';
import { Nullable } from 'app/types/Nullable';
import { StatusT } from 'app/types/StatusT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { canSwitchToT, ParentT, ResponseOneUser } from 'app/types/UserTypes';

export type ResponseLoadMeParentT = Omit<ParentT, 'avatar' | 'role' | 'sex' | 'birthdate' | 'city'>;

export type PersonalRecordT = {
  attention: number;
  logic: number;
  memory: number;
  mind: number;
  vision: number;
};

export type GroupsDataT = {
  id: string;
  stats: any[];
  status: string;
  group: ResponseOneGroup;
};

export type ResponseOneUserTypeForLoadMe = Omit<ResponseOneUser, 'franchise'>;

export type ResponseLoadMeBaseT = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: Nullable<string>;
  phone: Nullable<string>;
  role: string;
  franchise: Nullable<FranchiseT>;
  city: Nullable<string>;
  birthdate: TimeZoneType;
  sex: Nullable<boolean>;
  active: Nullable<boolean>;
  // status: string;
  payed?: Nullable<boolean>;
  avatar?: Nullable<AvatarT>;
  groups?: GroupsDataT[];
  canSwitchTo: canSwitchToT[];
  parent?: ResponseLoadMeParentT;
  personalRecord?: PersonalRecordT;
};
