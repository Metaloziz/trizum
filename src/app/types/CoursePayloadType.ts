import { CourseType } from './CourseTypes';

export type CoursePayloadType = Partial<
  Pick<CourseType, 'level' | 'status' | 'title' | 'type'> & {
    works?: { index: number; workId: string }[];
  }
>;
