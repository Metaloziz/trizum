export class SearchCoursesParamsType {
  level: string = '';

  title: string = '';

  per_page: number = 10;

  page: number = 0;

  total: number = 0;

  created_since: string = '';

  created_until: string = '';

  type: string = 'class'; // только для курсов

  status: string = '';
}
