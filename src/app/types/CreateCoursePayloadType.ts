import { CourseType } from './CourseTypes';

export type CreateCoursePayloadType = Pick<CourseType, 'level' | 'status' | 'title' | 'type'> & {
  works?: { index: number; workId: string }[];
};
