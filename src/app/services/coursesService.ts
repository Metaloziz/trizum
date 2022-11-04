import { Paths } from 'app/enums/Paths';
import instance from 'app/services/config';
import { ShortCourseType } from 'app/types/CourseTypes';
import { WithPagination } from 'app/types/WithPagination';
import { CreateCoursePayloadType } from '../types/CreateCoursePayloadType';
import { NewCourseType, ResponseCurrentCourse } from '../types/NewCourseType';
import { SearchCoursesParamsType } from '../types/SearchCoursesParamsType';

const coursesService = {
  getAllCourses: async (
    params?: Partial<SearchCoursesParamsType>,
  ): Promise<WithPagination<ShortCourseType[]>> => {
    const { data } = await instance.get(Paths.Courses, { params });
    return data;
  },

  getCurrentCourse: async (courseId: string) => {
    const { data } = await instance.get<ResponseCurrentCourse>(Paths.Courses + '/' + courseId);
    return data;
  },

  editCourse: async (model: Partial<NewCourseType>) => {
    const { data } = await instance.post<NewCourseType>(`${Paths.Courses}/${model.id}`, model);
    return data;
  },

  createCourse: async (model: CreateCoursePayloadType): Promise<ShortCourseType> => {
    const { data } = await instance.post(Paths.Courses, model);
    return data;
  },
};

export default coursesService;
