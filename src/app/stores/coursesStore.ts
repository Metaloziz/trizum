import coursesService from 'app/services/coursesService';
import {
  RequestCreateCourse,
  RequestEditCourse,
  ShortCourseType,
  ResponseWork,
  CourseType,
} from 'app/types/CourseTypes';
import { Nullable } from 'app/types/Nullable';
import { makeAutoObservable, runInAction } from 'mobx';
import { removeEmptyFields } from '../../utils/removeEmptyFields';

export type SearchCoursesParamsType = Pick<ShortCourseType, 'title' | 'level'> & {
  per_page: number;
  page: number;
  total: number;
  created_since: string;
};

class CoursesStore {
  private courses: Nullable<ShortCourseType[]> = null;

  currentCourse?: Nullable<CourseType> = null;

  homeworks: ResponseWork[] = [];

  private searchCoursesParams: SearchCoursesParamsType = {
    per_page: 10,
    page: 0,
    total: 1,
    title: '',
    level: '',
    created_since: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  getCourses = async () => {
    const params = removeEmptyFields(this.searchCoursesParams);
    delete params.total;

    const { items, page, perPage, total } = await coursesService.getAllCourses(params);
    runInAction(() => {
      this.courses = items;
      this.searchCoursesParams.page = page;
      this.searchCoursesParams.per_page = perPage;
      this.searchCoursesParams.total = total;
    });
  };

  setCurrentCourse = (course?: CourseType) => {
    this.currentCourse = course;
  };

  getOneCourse = async (id: string) => {
    try {
      const res = await coursesService.getOneCourse(id);
      this.setCurrentCourse(res);
    } catch (e) {
      console.warn(e);
    }
  };

  createCourse = async (data: RequestCreateCourse) => {
    try {
      await coursesService.createCourse(data);
      await this.getCourses();
    } catch (e) {
      console.warn(e);
    }
  };

  editCourse = async (data: RequestEditCourse, id: string) => {
    try {
      const res = await coursesService.editCourse(data, id);
      this.setCurrentCourse(res);
    } catch (e) {
      console.warn(e);
    }
  };

  getHomeworks = async () => {
    const res = await coursesService.getAllWorks();
    runInAction(() => {
      this.homeworks = res.reverse();
    });
  };

  setSearchCoursesParams = (params: Partial<SearchCoursesParamsType>) => {
    this.searchCoursesParams = { ...this.searchCoursesParams, ...params };
  };

  get getCoursesArray() {
    return this.courses;
  }

  get pagination(): Pick<SearchCoursesParamsType, 'total' | 'per_page' | 'page'> {
    return {
      page: this.searchCoursesParams.page,
      per_page: this.searchCoursesParams.per_page,
      total: Math.ceil(this.searchCoursesParams.total / this.searchCoursesParams.per_page),
    };
  }
}
export default new CoursesStore();
