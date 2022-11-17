import { ParentT } from 'app/types/UserTypes';

export type ResponseLoadMeParentT = Omit<ParentT, 'avatar' | 'role' | 'sex' | 'birthdate' | 'city'>;

export type PersonalRecordT = {
  attention: number;
  logic: number;
  memory: number;
  mind: number;
  vision: number;
};
