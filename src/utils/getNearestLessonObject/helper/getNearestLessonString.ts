import { ScheduleT } from 'app/types/ScheduleT';

export const getNearestLessonString = (data: ScheduleT): string => `${data?.date} в ${data?.to}`;
