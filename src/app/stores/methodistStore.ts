import { StatusTypes } from 'app/enums/StatusTypes';
import coursesService from 'app/services/coursesService';

import { StoreBase } from 'app/stores/StoreBase';
import { Nullable } from 'app/types/Nullable';
import { CourseViewModel } from 'app/viewModels/CourseViewModel';
import { getCorrectDate } from 'assets/helperFunctions/helperFunctions';
import { makeObservable, observable, toJS } from 'mobx';
import * as yup from 'yup';
import { MethodistMainFilterViewModel } from '../../components/methodist-main/models/MethodistMainFilterViewModel';
import { MethodistMainRepository } from '../../components/methodist-main/repositories';

class MethodistMainStore extends StoreBase {
  private _repository = new MethodistMainRepository();

  private _defaultValue = (): CourseViewModel => ({
    id: '',
    title: null,
    level: null,
    type: null,
    status: null,
  });

  pagination: {
    page: number;
    rowsPerPage: number;
    total: number;
  } = {
    page: 0,
    rowsPerPage: 5,
    total: 0,
  };

  currentCourse: CourseViewModel = this._defaultValue();

  coursesArray: CourseViewModel[] = [];

  filteredCourses: CourseViewModel[] = [];

  isDialogOpen: boolean = false;

  filter: Nullable<MethodistMainFilterViewModel> = null;

  constructor() {
    super();

    makeObservable(this, {
      currentCourse: observable,
      coursesArray: observable,
      isDialogOpen: observable,
      filter: observable,
      pagination: observable,
    });
  }

  openDialog = (editingEntity?: Partial<CourseViewModel>) => {
    this.currentCourse = editingEntity
      ? {
          status: editingEntity.status || null,
          title: editingEntity.title || null,
          type: editingEntity.type || null,
          level: editingEntity.level || null,
        }
      : this._defaultValue();
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  list = async () =>
    this.execute(async () => {
      const paginationResponse = await this._repository.list(this.pagination.page);
      this.coursesArray = paginationResponse.items;
      // this.entities = paginationResponse.items.filter(item=>item.status!=="archive");
      this.pagination = {
        page: paginationResponse.page,
        rowsPerPage: paginationResponse.perPage,
        total: paginationResponse.total,
      };
    });

  addOrEdit = async () => {
    this.closeDialog();

    this.execute(async () => {
      const asd = this.currentCourse.works?.length
        ? this.currentCourse.works.map((el, index) => ({
            index,
            workId: el.id || '',
          }))
        : [];
      let status;
      if (this.currentCourse?.id) {
        status = this.currentCourse.status;
      }
      if (!this.currentCourse?.id) {
        if (this.currentCourse.status === 'draft') {
          status = undefined;
        } else {
          status = this.currentCourse.status;
        }
      }
      const data = {
        ...this.currentCourse,
        status: status || StatusTypes.draft,
        works: this.currentCourse.works?.length ? asd : undefined,
      };
      await this._repository.addOrEdit(data);
      await this.pull();
    });
  };

  remove = async (id: string) => {
    const newStatus =
      this.currentCourse.status === StatusTypes.active ? StatusTypes.removal : StatusTypes.archive;

    const currentEntity = toJS(this.coursesArray).find(ent => ent.id === id);
    const status = currentEntity?.status;
    try {
      if (status) {
        /* change status of the course to archive  */
        // if (status !== StatusTypes.draft) { delete course if its status draft
        this.currentCourse = currentEntity
          ? { ...currentEntity, status: newStatus }
          : this._defaultValue();
        await this.addOrEdit();
      } else {
        const res = await coursesService.deleteCourse(id);
        await this.pull();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  pull = async () => {
    await this.execute(async () => this.list());
  };

  changePage = async (page: number) => {
    this.pagination.page = page;
    this.execute(async () => this.list());
  };

  get validateSchema() {
    return yup.object<Record<keyof CourseViewModel, any>>().shape({
      title: yup.string().required('*'),
      level: yup.string().required('*'),
      status: yup.string().required('*'),
      type: yup.string().required('*'),
    });
  }

  get filteredEntities() {
    if (!this.filter) {
      return this.coursesArray;
    }

    if (this.filter.title.trim()) {
      this.filteredCourses = this.coursesArray.filter(entity =>
        (entity.title ?? '').toLowerCase().includes(this.filter!.title.toLowerCase()),
      );
    }

    if (this.filter.level.trim()) {
      if (this.filter.level === 'Младшая группа') {
        this.filter.level = 'easy';
      } else if (this.filter.level === 'Средняя группа') {
        this.filter.level = 'medium';
      } else if (this.filter.level === 'Старшая группа') {
        this.filter.level = 'hard';
      }
      this.filteredCourses = (this.filteredCourses || this.coursesArray).filter(entity =>
        (entity.level ?? '').toLowerCase().includes(this.filter!.level.toLowerCase()),
      );
    }

    if (this.filter.createdAt) {
      const date = this.filter.createdAt.format('DD.MM.YYYY');
      this.filteredCourses = (this.filteredCourses || this.coursesArray).filter(entity => {
        const entityDate = getCorrectDate(entity.createdAt?.date as string);
        return entityDate === date;
      });
    }

    return this.filteredCourses;
  }
}

export default new MethodistMainStore();
