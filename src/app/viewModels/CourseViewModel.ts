import { HomeworkViewModel } from './HomeworkViewModel';

import { TimeZoneType } from 'app/types/TimeZoneType';
import { Nullable } from 'app/types/Nullable';

export interface CourseViewModel {
  id?: string;
  title: Nullable<string>;
  // description?: string; // убрал так как нету такого поля в курсах
  // level: 'easy' | 'medium' | 'hard';
  level: Nullable<string>;
  type: Nullable<string>;
  status: Nullable<string>;
  works?: HomeworkViewModel[];
  worksCount?: number;
  createdAt?: TimeZoneType;
}

export type RequestCoursesForFilter = {
  page?: number | null,
  title?: string | null;
  level?: string | null;
  createdSince?: string | null;
}

export type CourseViewModelAddEdit = Omit<CourseViewModel, 'works' | 'status'> & {
  works?: { index: number; workId: string }[];
  status?: string;
};
