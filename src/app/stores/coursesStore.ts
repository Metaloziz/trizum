import coursesService from 'app/services/coursesService';
import groupStore from 'app/stores/groupStore';
import { CoursePayloadType } from 'app/types/CoursePayloadType';
import { ShortCourseType } from 'app/types/CourseTypes';
import { NewWorkType } from 'app/types/NewWorkType';
import { Nullable } from 'app/types/Nullable';
import { runInAction, observable, makeObservable } from 'mobx';
import { execute } from 'utils/execute';
import { removeEmptyFields } from 'utils/removeEmptyFields';
import * as yup from 'yup';
import { GroupLevels } from '../enums/GroupLevels';
import { StatusTypes } from '../enums/StatusTypes';
import { FilterData } from '../types/FilterData';
import { NewCourseType } from '../types/NewCourseType';
import { PaginationType } from '../types/PaginationType';
import { SearchCoursesParamsType } from '../types/SearchCoursesParamsType';
import { CourseViewModel } from '../viewModels/CourseViewModel';
import { StoreBase } from './StoreBase';

class CoursesStore extends StoreBase {
  courses: Nullable<ShortCourseType[]> = null;

  currentCourse = new NewCourseType();

  isDialogOpen: boolean = false;

  // for ClassesMethodistPage

  currentHomework = new NewWorkType();

  // for ClassesMethodistPage

  private searchCoursesParams = new SearchCoursesParamsType();

  constructor() {
    super();
    makeObservable(this, {
      getCourses: observable,
      createCourse: observable,
      isDialogOpen: observable,
      courses: observable,
      currentCourse: observable,
      currentHomework: observable,
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

  getCoursesOlimp = async () => {
    await this.execute(async () => {
      const { items } = await coursesService.getCoursesOlimp();
      runInAction(() => {
        this.courses = items;
      });
    });
  };

  getCurrentCourse = async (courseId: string) => {
    await this.execute(async () => {
      const { course } = await coursesService.getCurrentCourse(courseId);

      this.currentCourse = course;
    });
  };

  createCourse = async () => {
    execute(async () => {
      if (this.currentCourse) {
        const data: CoursePayloadType = {
          status: this.currentCourse.status as StatusTypes,
          level: this.currentCourse.level || GroupLevels.easy,
          type: this.currentCourse.type || '',
          title: this.currentCourse.title || '',
        };

        if (this.currentCourse.works) {
          data.works = this.currentCourse.works?.map(el => ({
            index: Number(el.index),
            workId: el.id,
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
      const { id, ...payload } = this.currentCourse;

      if (!payload?.works?.length) {
        delete payload.works;
      }

      // Чтобы добавить в курс work, нужно отправить такой объект { index: ...,
      // workId: ... }
      const payloadWithWorks: CoursePayloadType = {
        ...payload,
        status: payload.status as StatusTypes,
        works: payload.works?.map(work => ({ index: work.index, workId: work.work.id })),
      };

      if (id) {
        await coursesService.editCourse(payloadWithWorks, id);
        await this.getCourses();
        this.setIsDialogOpen(false);
      }
    });
  };

  setIsDialogOpen = (isOpen: boolean) => {
    this.isDialogOpen = isOpen;
    this.setCurrentCourse(new NewCourseType());
  };

  setCurrentCourse = (course: NewCourseType) => {
    runInAction(() => {
      if (course === null) {
        this.currentCourse = new NewCourseType();
      } else {
        this.currentCourse = { ...this.currentCourse, ...course };
      }
    });
  };

  setSearchCoursesParams = (params: Partial<SearchCoursesParamsType>) => {
    this.searchCoursesParams = { ...this.searchCoursesParams, ...params };
  };

  setCurrentHomeWork = (workIndex: number) => {
    const newIndex = groupStore.filteredHomeWork[workIndex].index;

    // need to change on the filtered works
    const result = this.currentCourse?.works?.find(workItem => workItem.index === newIndex);

    if (result) {
      this.currentHomework = result;
    }
  };

  get validateSchema() {
    return yup.object<Record<keyof CourseViewModel, any>>().shape({
      title: yup.string().required('*'),
      level: yup.string().required('*'),
      status: yup.string().required('*'),
      type: yup.string().required('*'),
    });
  }

  get pagination(): PaginationType {
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
