import coursesService, { CreateCoursePayloadType } from 'app/services/coursesService';
import { ShortCourseType } from 'app/types/CourseTypes';
import { Nullable } from 'app/types/Nullable';
import { runInAction, observable, makeObservable } from 'mobx';
import * as yup from 'yup';
import { execute } from '../../utils/execute';
import { removeEmptyFields } from '../../utils/removeEmptyFields';
import { GroupLevels } from '../enums/GroupLevels';
import { StatusTypes } from '../enums/StatusTypes';
import { FilterData } from '../types/FilterData';
import { NewCourseType } from '../types/NewCourseType';
import { SearchCoursesParamsType } from '../types/SearchCoursesParamsType';
import { CourseViewModel } from '../viewModels/CourseViewModel';
import { StoreBase } from './StoreBase';

class CoursesStore extends StoreBase {
  courses: Nullable<ShortCourseType[]> = null;

  currentCourse = new NewCourseType();

  isDialogOpen: boolean = false;

  private searchCoursesParams = new SearchCoursesParamsType();

  constructor() {
    super();
    makeObservable(this, {
      getCourses: observable,
      createCourse: observable,
      isDialogOpen: observable,
      courses: observable,
      currentCourse: observable,
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
            index: Number(el.index),
            workId: el.workId,
          }));
        }

        await coursesService.createCourse(data);
        await this.getCourses();
      }

      this.setIsDialogOpen(false);
    });
  };

  editCourse = async () => {
    await this.execute(async () => {
      const newCourse = removeEmptyFields(this.currentCourse);

      if (!newCourse.works.length) {
        delete newCourse.works;
      }

      await coursesService.editCourse(newCourse);
      await this.getCourses();
    });
  };

  setIsDialogOpen = (isOpen: boolean) => {
    this.isDialogOpen = isOpen;
    this.setCurrentCourse(new NewCourseType());
  };

  setCurrentCourse = (course: NewCourseType) => {
    if (course === null) {
      this.currentCourse = new NewCourseType();
    } else {
      this.currentCourse = { ...this.currentCourse, ...course };
    }
  };

  setSearchCoursesParams = (params: Partial<SearchCoursesParamsType>) => {
    this.searchCoursesParams = { ...this.searchCoursesParams, ...params };
  };

  get validateSchema() {
    return yup.object<Record<keyof CourseViewModel, any>>().shape({
      title: yup.string().required('*'),
      level: yup.string().required('*'),
      status: yup.string().required('*'),
      type: yup.string().required('*'),
    });
  }

  get pagination(): Pick<SearchCoursesParamsType, 'total' | 'per_page' | 'page'> {
    return {
      page: this.searchCoursesParams.page,
      per_page: this.searchCoursesParams.per_page,
      total: Math.ceil(this.searchCoursesParams.total / this.searchCoursesParams.per_page),
    };
  }

  get filterData(): FilterData {
    return {
      title: this.searchCoursesParams.title,
      level: this.searchCoursesParams.level,
      created_since: this.searchCoursesParams.created_since,
    };
  }
}
export default new CoursesStore();
