import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  GetCoursesParams,
  RequestCreateCourse,
  RequestEditCourse,
  ShortCourseType,
  ResponseDeleteCourse,
  ResponseOneCourse,
  ResponseOneFullCourse,
  ResponseWork,
  CourseType,
} from 'app/types/CourseTypes';
import { WithPagination } from 'app/types/WithPagination';
import { SearchCoursesParamsType } from '../stores/coursesStore';
import { PaginationResponse } from '../types/PaginationResponse';
import { CourseViewModel } from '../viewModels/CourseViewModel';

const coursesService = {
  getAllCourses: async (
    params?: Partial<SearchCoursesParamsType>,
  ): Promise<WithPagination<ShortCourseType[]>> => {
    const { data } = await instance.get(Paths.Courses, { params });
    return data;
  },
  getOneCourse: async (id: string): Promise<CourseType> => {
    const { data } = await instance.get(`${Paths.Courses}/${id}`);
    return data;
  },
  createCourse: async (options: RequestCreateCourse): Promise<ShortCourseType> => {
    const { data } = await instance.post(Paths.Courses, options);
    return data;
  },
  editCourse: async (options: RequestEditCourse, id: string): Promise<CourseType> => {
    const { data } = await instance.post(`${Paths.Courses}/${id}`, options);
    return data;
  },
  deleteCourse: async (id: string): Promise<ResponseDeleteCourse> => {
    const { data } = await instance.delete(`${Paths.Courses}/${id}`);
    return data;
  },
  getAllWorks: async (): Promise<ResponseWork[]> => {
    const { data } = await instance.get(Paths.Works);
    return data;
  },
  getOneWork: async (id: string): Promise<any> => {
    const { data } = await instance.get(`${Paths.Works}/${id}`);
    return data;
  },
};

export default coursesService;
