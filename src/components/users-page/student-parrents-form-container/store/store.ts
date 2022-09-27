import { ParentT } from 'app/types/UserTypes';

export type ParentsFormStateType = {
  localParentFormId: number;
  isSuccessSubmit: boolean;
  isMain: boolean;
  parent?: ParentT;
};

export const MAX_PARENTS_COUNT = 3;
export const MAIN_PARENT_ID = 1;

export const INITIAL_PARENT_FORM_STATE: ParentsFormStateType[] = [
  {
    localParentFormId: MAIN_PARENT_ID,
    isSuccessSubmit: false,
    isMain: true,
  },
];

export const setInitialState = (parents?: ParentT[]): ParentsFormStateType[] => {
  if (parents) {
    return parents.map((parent, index) => ({
      localParentFormId: index + 1,
      isSuccessSubmit: true,
      isMain: parent.main,
      parent,
    }));
  }
  return INITIAL_PARENT_FORM_STATE;
};
