import { SearchCoursesParamsType } from './SearchCoursesParamsType';

export type PaginationType = Pick<SearchCoursesParamsType, 'total' | 'per_page' | 'page'>;
