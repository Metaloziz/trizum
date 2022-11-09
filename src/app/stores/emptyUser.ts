import { AvatarT } from 'app/types/AvatarT';
import { FranchiseT } from 'app/types/FranchiseTypes';
import { Group } from 'app/types/LoadMeTypes';
import { ResponseLoadMeParentT, PersonalRecordT } from 'app/types/ResponseLoadMeBaseT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { canSwitchToT } from 'app/types/UserTypes';

export class EmptyUser {
  id;

  firstName;

  middleName: null | string;

  lastName;

  email;

  phone;

  role;

  franchise: FranchiseT = {} as FranchiseT;

  city: null | string;

  birthdate: TimeZoneType;

  sex: null | string;

  status;

  avatar: AvatarT;

  groups: Group[];

  canSwitchTo: canSwitchToT[];

  active = false;

  parent: ResponseLoadMeParentT = {} as ResponseLoadMeParentT;

  password: string;

  personalRecord: PersonalRecordT;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.role = '';
    this.city = '';
    this.birthdate = {
      date: '',
      timezone_type: 0,
      timezone: '',
    };
    this.personalRecord = {
      attention: 0,
      logic: 0,
      memory: 0,
      mind: 0,
      vision: 0,
    };
    this.password = '';
    this.sex = '';
    this.status = '';
    this.avatar = {
      createdAt: {} as TimeZoneType,
      type: '',
      previewPath: '',
      id: '',
      path: '',
    };
    this.groups = [];
    this.canSwitchTo = [];
    this.parent = {} as ResponseLoadMeParentT;
  }
}
