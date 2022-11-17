import { ScheduleFromLoadme } from 'app/types/LoadMeTypes';
import { dateNow } from 'utils/dateNow';
import { getNearestLessonObject } from 'utils/getNearestLessonObject/getNearestLessonObject';

export const getLessonIndex = (schedule: ScheduleFromLoadme[]) => {
  let lessonIndex = -1;

  const lesson = getNearestLessonObject(schedule, dateNow());
  if (lesson) {
    lessonIndex = schedule.indexOf(lesson);
  }

  return lessonIndex;
};
