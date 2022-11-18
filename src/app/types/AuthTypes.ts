import { Roles } from 'app/enums/Roles';

export type RequestSMS = { phone: string };
export type RequestLogin = { phone: string; smsCode: number };
export type RequestSwitchUser = { id: string };

export type ResponseSMS = { code: number };
export type ResponseLogin = {
  result: {
    response: string;
  };
  data: {
    token: string;
    id: string;
  };
};

export type ResponseMe = {
  id: string;
  email: string;
  phone: string;
  role: string;
};

export type RequestRegister = {
  phone?: string;
  email?: string;
  role: Roles;
  franchiseId?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  city: string;
  birthdate: string;
  sex: boolean;
  groupId?: string;
  tariffId?: string;
  isSecondChild?: boolean;
  password: string;
};

export type ResponseAvatar = {
  image: string;
};

export type ResponseEditSelf = {
  phone: string;
  smsCode?: number;
  password?: string;
  email: string;
};
