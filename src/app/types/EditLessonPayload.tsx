import { Schedule } from './GroupTypes';

export type EditLessonPayload = {
  schedule: Schedule;
  lessonIndex: number;
  groupId: string;
};
