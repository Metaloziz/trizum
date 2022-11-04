import { NewWorkType } from './NewWorkType';
import { TimeZoneType } from './TimeZoneType';

export class NewCourseType {
  id?: string = '';

  type?: string = '';

  status?: string = '';

  title?: string = '';

  level?: string = '';

  worksCount?: number = 0;

  createdAt? = new TimeZoneType();

  works? = [new NewWorkType()];
}

export class ResponseCurrentCourse {
  course = new NewCourseType();
}
