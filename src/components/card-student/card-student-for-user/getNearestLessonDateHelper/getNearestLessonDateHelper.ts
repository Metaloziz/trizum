import { Group } from 'app/types/LoadMeTypes';
import { dateNow } from 'utils/dateNow';
import { getClassTypeGroups } from 'utils/getClassTypeGroups';
import { getNearestLessonString } from 'utils/getNearestLessonObject/helper/getNearestLessonString';
import { getNearestLessonObject } from '../../../../utils/getNearestLessonObject/getNearestLessonObject';

export const getNearestLessonDateHelper = (groups: Group[] | undefined): string => {
  let lessonDate = 'нету ближайших занятий';

  // в массиве могут быть и только прошлые занятия
  if (groups?.length) {
    const result = getClassTypeGroups(groups);

    const result2 = getNearestLessonObject(result, dateNow());
    if (result2) {
      lessonDate = getNearestLessonString(result2);
    }
  }

  return lessonDate;
};
