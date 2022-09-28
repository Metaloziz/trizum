import { ScheduleT } from 'app/types/ScheduleT';

export const getNearestLessonDate = (data: ScheduleT): string => `${data?.date} в ${data?.to}`;
