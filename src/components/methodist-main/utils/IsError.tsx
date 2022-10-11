import { CourseViewModel } from 'app/viewModels/CourseViewModel';
import methodistStore from 'app/stores/methodistStore';
import coursesStore from '../../../app/stores/coursesStore';

type InputNameType = keyof Pick<CourseViewModel, 'title' | 'level' | 'type' | 'status'>;

export const isError = (inputName: InputNameType): boolean => {
  const { validateSchema, currentCourse } = coursesStore;

  if (currentCourse) {
    return (
      currentCourse[inputName] !== null &&
      !validateSchema.fields[inputName].isValidSync(currentCourse[inputName])
    );
  }

  return false;
};
