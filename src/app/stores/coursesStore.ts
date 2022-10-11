import coursesService, { CreateCoursePayloadType } from 'app/services/coursesService';
import {
  RequestEditCourse,
  ShortCourseType,
  ResponseWork,
  CourseType,
} from 'app/types/CourseTypes';
import { Nullable } from 'app/types/Nullable';
import { makeAutoObservable, runInAction, observable, makeObservable } from 'mobx';
import * as yup from 'yup';
import { execute } from '../../utils/execute';
import { removeEmptyFields } from '../../utils/removeEmptyFields';
import { GroupLevels } from '../enums/GroupLevels';
import { StatusTypes } from '../enums/StatusTypes';
import { CourseViewModel, CourseViewModelAddEdit } from '../viewModels/CourseViewModel';
import { StoreBase } from './StoreBase';

export type SearchCoursesParamsType = Pick<ShortCourseType, 'title' | 'level'> & {
  per_page: number;
  page: number;
  total: number;
  created_since: string;
};

class CoursesStore extends StoreBase {
  courses: Nullable<ShortCourseType[]> = null;

  currentCourse: Nullable<Partial<CourseType>> = null;

  homeworks: ResponseWork[] = [];

  isDialogOpen: boolean = false;

  private searchCoursesParams: SearchCoursesParamsType = {
    per_page: 10,
    page: 0,
    total: 1,
    title: '',
    level: '',
    created_since: '',
  };

  constructor() {
    super();
    makeObservable(this, {
      getCourses: observable,
      createCourse: observable,
      homeworks: observable,
      isDialogOpen: observable,
      courses: observable,
    });
  }

  getCourses = async () => {
    const params = removeEmptyFields(this.searchCoursesParams);
    delete params.total;

    this.execute(async () => {
      const { items, page, perPage, total } = await coursesService.getAllCourses(params);
      runInAction(() => {
        this.courses = items;
        this.searchCoursesParams.page = page;
        this.searchCoursesParams.per_page = perPage;
        this.searchCoursesParams.total = total;
      });
    });
  };

  createCourse = async () => {
    execute(async () => {
      if (this.currentCourse) {
        const data: CreateCoursePayloadType = {
          status: this.currentCourse.status as StatusTypes,
          level: this.currentCourse.level || GroupLevels.easy,
          type: this.currentCourse.type || '',
          title: this.currentCourse.title || '',
        };

        if (this.currentCourse.works) {
          data.works = this.currentCourse.works?.map(el => ({
            index: Number(el.id),
            workId: el.work.id,
          }));
        }

        const res = await coursesService.createCourse(data);
        this.getCourses();
      }
    });
  };

  editCourse = async () => {
    await this.execute(async () => {
      if (this.currentCourse) {
        await coursesService.editCourse(this.currentCourse);
        await this.getCourses();
      }
    });
  };

  setIsDialogOpen = (isOpen: boolean) => {
    this.isDialogOpen = isOpen;
  };

  onChangeFilter = (filter: Partial<SearchCoursesParamsType>) => {
    this.searchCoursesParams = { ...this.searchCoursesParams, ...filter };
  };

  setCurrentCourse = (course: Partial<CourseType>) => {
    this.currentCourse = { ...this.currentCourse, ...course };
  };

  get validateSchema() {
    return yup.object<Record<keyof CourseViewModel, any>>().shape({
      title: yup.string().required('*'),
      level: yup.string().required('*'),
      status: yup.string().required('*'),
      type: yup.string().required('*'),
    });
  }

  /// ////////////////////

  getOneCourse = async (id: string) => {
    try {
      const res = await coursesService.getOneCourse(id);
      this.setCurrentCourse(res);
    } catch (e) {
      console.warn(e);
    }
  };

  // createCourse = async (data: RequestCreateCourse) => {
  //   try {
  //     await coursesService.createCourse(data);
  //     await this.getCourses();
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  getHomeworks = async () => {
    const res = await coursesService.getAllWorks();
    runInAction(() => {
      this.homeworks = res.reverse();
    });
  };

  setSearchCoursesParams = (params: Partial<SearchCoursesParamsType>) => {
    this.searchCoursesParams = { ...this.searchCoursesParams, ...params };
  };

  get pagination(): Pick<SearchCoursesParamsType, 'total' | 'per_page' | 'page'> {
    return {
      page: this.searchCoursesParams.page,
      per_page: this.searchCoursesParams.per_page,
      total: Math.ceil(this.searchCoursesParams.total / this.searchCoursesParams.per_page),
    };
  }
}
export default new CoursesStore();
