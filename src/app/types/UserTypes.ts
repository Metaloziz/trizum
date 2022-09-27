import { Roles } from 'app/stores/appStore';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { Nullable } from 'app/types/Nullable';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { WithPagination } from 'app/types/WithPagination';

export type RequestUsersParams = {
  role?: Roles;
  page?: number;
  perPage?: number;
  franchiseId?: string;
};

export type RequestUsersForFilter = {
  role?: string | null;
  page?: number | null;
  perPage?: number | null;
  franchiseId?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  city?: string | null;
  birthdate_since?: string | null;
  birthdate_until?: string | null;
  is_payed?: boolean | null;
  phone?: number | null;
  email?: string | null;
  tariff_id?: string | null;
  is_active?: boolean | null;
  active?: boolean;
};

export type RequestCreateUser = {
  role: string;
  franchiseId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  birthdate: string;
  sex: boolean | null;
  phone: string | null;
  email: string | null;
};

export type ResponseOneUserGroupT = {
  userGroupId: string;
  groupId: string;
  groupCode: string;
  groupType: null | string;
};

type ResponseUserAvatarT = {
  id: string;
  path: string;
};

export type canSwitchToT = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: null | string;
  isActive: boolean;
  isPayed: boolean;
};

export type ResponseUserT = {
  id: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  phone: string | null;
  email: string | null;
  roleCode: string;
  franchise: FranchiseT | null;
  city: string | null;
  groups: ResponseOneUserGroupT[];
  status: UserStatusT;
  avatar: Nullable<ResponseUserAvatarT>;
  canSwitchTo: canSwitchToT[];
  active: boolean;
  payed: boolean;
  isPayed: boolean;
  isActive: boolean;
};
export type FullResponseUserT = WithPagination<ResponseUserT[]>;

export type UserStatusT = boolean;

export type ParentT = {
  id: string; // parenting id
  parentId: string; // user id
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: null;
  role: string;
  sex: boolean;
  birthdate: TimeZoneType;
  city: string;
  phone: string;
  email: string;
  main: boolean;
  password: string;
};

export type ParentDataT = {
  parentingId: string;
  isMain: boolean;
  parent: ParentT;
};

export type ResponseOneUser = {
  birthdate: TimeZoneType;
  sex: boolean | null; // male - true
  createdAt: TimeZoneType;
  groups: ResponseOneUserGroupT[];
  parents: ParentT[];
  tariff: null | any;
  payedUntill: null | any;
  isSecondChild: null | boolean;
  password: string;
} & ResponseUserT;

export type RequestParenting = {
  parentId: string;
  childId: string;
  isMain: boolean;
};

export type ResponseParenting = {
  id: string;
  childId: string;
  parentId: string;
  isMain: boolean;
};
