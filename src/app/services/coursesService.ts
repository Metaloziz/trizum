import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import {
  ShortCourseType,
  ResponseDeleteCourse,
  ResponseWork,
  CourseType,
} from 'app/types/CourseTypes';
import { WithPagination } from 'app/types/WithPagination';
import { SearchCoursesParamsType } from '../stores/coursesStore';

export type CreateCoursePayloadType = Pick<CourseType, 'level' | 'status' | 'title' | 'type'> & {
  works?: { index: number; workId: string }[];
};

const coursesService = {
  getAllCourses: async (
    params?: Partial<SearchCoursesParamsType>,
  ): Promise<WithPagination<ShortCourseType[]>> => {
    const { data } = await instance.get(Paths.Courses, { params });
    return data;
  },

  editCourse: async (model: Partial<CourseType>): Promise<CourseType> => {
    const { data } = await instance.post(`${Paths.Courses}/${model.id}`, model);
    return data;
  },

  createCourse: async (model: CreateCoursePayloadType): Promise<ShortCourseType> => {
    const { data } = await instance.post(Paths.Courses, model);
    return data;
  },

  /// ////////////////////////////////////////
  getOneCourse: async (id: string): Promise<CourseType> => {
    const { data } = await instance.get(`${Paths.Courses}/${id}`);
    return data;
  },
  // createCourse: async (options: RequestCreateCourse): Promise<ShortCourseType> => {
  //   const { data } = await instance.post(Paths.Courses, options);
  //   return data;
  // },
  // editCourse: async (options: RequestEditCourse, id: string): Promise<CourseType> => {
  //   const { data } = await instance.post(`${Paths.Courses}/${id}`, options);
  //   return data;
  // },
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
