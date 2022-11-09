import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ShortCourseType } from 'app/types/CourseTypes';
import { WithPagination } from 'app/types/WithPagination';
import { CoursePayloadType } from 'app/types/CoursePayloadType';
import { NewCourseType, ResponseCurrentCourse } from '../types/NewCourseType';
import { SearchCoursesParamsType } from '../types/SearchCoursesParamsType';

const coursesService = {
  getAllCourses: async (params?: Partial<SearchCoursesParamsType>) => {
    const { data } = await instance.get<WithPagination<ShortCourseType[]>>(Paths.Courses, {
      params,
    });
    return data;
  },

  getCoursesOlimp: async (): Promise< {items: ShortCourseType[]}> => {
    const { data } = await instance.get(Paths.Courses + '?type=olympiad&status=active');
    return data;
  },

  getCurrentCourse: async (courseId: string) => {
    const { data } = await instance.get<ResponseCurrentCourse>(Paths.Courses + '/' + courseId);
    return data;
  },

  editCourse: async (payload: CoursePayloadType, courseId: string) => {
    const { data } = await instance.post<NewCourseType>(`${Paths.Courses}/${courseId}`, payload);
    return data;
  },

  createCourse: async (model: CoursePayloadType) => {
    const { data } = await instance.post<NewCourseType>(Paths.Courses, model);
    return data;
  },
};

export default coursesService;
