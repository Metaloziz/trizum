import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { OptionT } from 'app/types/OptionT';
import { ResponseCourse } from 'app/types/CourseTypes';

export const convertCourseOptions = (courses: ResponseCourse[]): OptionT[] =>
  courses.map(item => ({ value: item.id, label: item.title }));
