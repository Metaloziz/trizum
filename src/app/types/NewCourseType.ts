import { NewWorkType } from './NewWorkType';
import { TimeZoneType } from './TimeZoneType';

export class NewCourseType {
  id?: string = '';

  type?: string = '';

  title?: string = '';

  level?: string = '';

  status?: string = '';

  worksCount?: number = 0;

  works?: NewWorkType[] = [];

  createdAt?: TimeZoneType = new TimeZoneType();
}
