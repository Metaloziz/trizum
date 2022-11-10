import { StatusTypes } from 'app/enums/StatusTypes';
import { Nullable } from 'app/types/Nullable';
import { OneTestBodyT } from 'app/types/TestsT';
import { TimeZoneType } from 'app/types/TimeZoneType';
import { MyValue } from 'components/PlateEditor/types';

export type ArticleT = {
  id: string;
  title: string;
  content: MyValue;
  test: Nullable<OneTestBodyT>;
  status: StatusTypes;
  createdAt: TimeZoneType;
  forStudents: boolean;
  forTeachersEducation: boolean;
  forTeachers: boolean;
  forFranchiseeAdmin: boolean;
  forFranchisee: boolean;
  forTutor: boolean;
  forMethodist: boolean;
};
