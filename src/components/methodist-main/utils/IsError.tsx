import { CourseViewModel } from 'app/viewModels/CourseViewModel';
import methodistStore from 'app/stores/methodistStore';

type InputNameType = keyof Pick<CourseViewModel, 'title' | 'level' | 'type' | 'status'>;

export const isError = (store: typeof methodistStore, inputName: InputNameType): boolean => {
  if (!!store.currentCourse[inputName]) {
    return (
      store.currentCourse[inputName] !== null &&
      !store.validateSchema.fields[inputName].isValidSync(store.currentCourse[inputName])
    );
  }

  return false;
};
