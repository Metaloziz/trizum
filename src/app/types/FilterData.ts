import { SearchCoursesParamsType } from './SearchCoursesParamsType';

export type FilterData = Pick<SearchCoursesParamsType, 'title' | 'level' | 'created_since'>;
