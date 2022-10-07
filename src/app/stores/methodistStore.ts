import coursesService from 'app/services/coursesService';
import { makeObservable, observable, toJS } from 'mobx';
import * as yup from 'yup';

import { MethodistMainFilterViewModel } from '../../components/methodist-main/models/MethodistMainFilterViewModel';
import { MethodistMainRepository } from '../../components/methodist-main/repositories';

import { StoreBase } from 'app/stores/StoreBase';
import { Nullable } from 'app/types/Nullable';
import { CourseViewModel } from 'app/viewModels/CourseViewModel';
import { StatusTypes } from 'app/enums/StatusTypes';
import { getCorrectDate } from 'assets/helperFunctions/helperFunctions';

class MethodistStore extends StoreBase {
  private _repository = new MethodistMainRepository();

  private _defaultValue = (): CourseViewModel => ({
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

  editingEntity: CourseViewModel = this._defaultValue();

  entities: CourseViewModel[] = [];

  filtered: CourseViewModel[] = [];

  isDialogOpen: boolean = false;

  filter: Nullable<MethodistMainFilterViewModel> = null;

  constructor() {
    super();

    makeObservable(this, {
      editingEntity: observable,
      entities: observable,
      isDialogOpen: observable,
      filter: observable,
    });
  }

  openDialog = (editingEntity?: CourseViewModel) => {
    this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  list = async () =>
    this.execute(async () => {
      const paginationResponse = await this._repository.list(this.pagination.page);
      this.entities = paginationResponse.items;
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
      const asd = this.editingEntity.works?.length
        ? this.editingEntity.works.map((el, index) => ({
            index,
            workId: el.id || '',
          }))
        : [];
      let status;
      if (this.editingEntity?.id) {
        status = this.editingEntity.status;
      }
      if (!this.editingEntity?.id) {
        if (this.editingEntity.status === 'draft') {
          status = undefined;
        } else {
          status = this.editingEntity.status;
        }
      }
      const data = {
        ...this.editingEntity,
        status: status || StatusTypes.draft,
        works: this.editingEntity.works?.length ? asd : undefined,
      };
      await this._repository.addOrEdit(data);
      await this.pull();
    });
  };

  remove = async (id: string) => {
    const currentEntity = toJS(this.entities).find(ent => ent.id === id);
    const status = currentEntity?.status;
    try {
      if (status) {
        /* change status of the course to archive  */
        // if (status !== StatusTypes.draft) { delete course if its status draft
        this.editingEntity = currentEntity
          ? { ...currentEntity, status: StatusTypes.archive }
          : this._defaultValue();
        await this.addOrEdit();
      } else {
        const res = await coursesService.deleteCourse(id);
        console.log(res);
        await this.pull();
      }
    } catch (error) {
      console.warn(error);
    }
  };

  pull = async () => {
    await this.execute(async () => this.list());
  };

  onChangeFilter = (filter: Nullable<MethodistMainFilterViewModel>) => {
    this.filter = filter;
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
      return this.entities;
    }

    if (this.filter.title.trim()) {
      this.filtered = this.entities.filter(
        entity => (entity.title ?? '').toLowerCase().includes(this.filter!.title.toLowerCase()),
        console.log(toJS(this.filtered)),
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
      this.filtered = (this.filtered || this.entities).filter(entity =>
        (entity.level ?? '').toLowerCase().includes(this.filter!.level.toLowerCase()),
      );
    }

    if (this.filter.createdAt) {
      const date = this.filter.createdAt.format('DD.MM.YYYY');
      this.filtered = (this.filtered || this.entities).filter(entity => {
        const entityDate = getCorrectDate(entity.createdAt?.date as string);
        return entityDate === date;
      });
    }

    return this.filtered;
  }
}

export default new MethodistStore();
