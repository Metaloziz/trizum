import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { OptionT } from 'app/types/OptionT';
import { ShortCourseType } from 'app/types/CourseTypes';
import { Nullable } from '../app/types/Nullable';

export const convertCourseOptions = (courses: Nullable<ShortCourseType[]>): OptionT[] => {
  let optionCourse = [{ value: '', label: '' }];
  if (courses) {
    optionCourse = courses.map(item => ({ value: item.id, label: item.title }));
  }

  return [{ value: '', label: 'Не выбрано' }, ...optionCourse];
};
