import { Nullable } from 'app/types/Nullable';
import { MyValue } from 'components/PlateEditor/types';
import { StatusT } from 'app/types/StatusT';

export type ArticlePayloadT = {
  title: string;
  content: MyValue;
  testId?: Nullable<string>;
  status?: StatusT;
  forStudents?: boolean;
  forTeachersEducation?: boolean;
  forTeachers?: boolean;
  forFranchiseeAdmin?: boolean;
  forFranchisee?: boolean;
  forTutor?: boolean;
  forMethodist?: boolean;
};
