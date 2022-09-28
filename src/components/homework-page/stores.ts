import { WorkTypes } from 'app/enums/WorkTypes';
import worksService from 'app/services/worksService';

import { StoreBase } from 'app/stores/StoreBase';
import { CreatOrEditWorkRequestT, OneWorkResponseT } from 'app/types/WorkTypes';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';
import { makeObservable, observable } from 'mobx';
import * as yup from 'yup';

import { HomeworkRepository } from './repositories';

export class HomeworkStore extends StoreBase {
  private _repository = new HomeworkRepository();

  isDialogOpen: boolean = false;

  entities: HomeworkViewModel[] = [];

  pagination: {
    page: number;
    rowsPerPage: number;
    total: number;
  } = {
    page: 0,
    rowsPerPage: 5,
    total: 0,
  };

  private _defaultValue = (): HomeworkViewModel => ({
    text: '',
    title: '',
    status: '',
    id: '',
    type: WorkTypes.HW,
    gamePresets: [],
    gamePresetsCount: 0,
  });

  private _defaultOneWork: OneWorkResponseT = {
    work: {
      id: '',
      status: 'draft',
      title: '',
      text: '',
      type: WorkTypes.HW,
      createdAt: {
        date: '',
        timezone_type: 0,
        timezone: '',
      },
      gamePresets: [],
    },
    usedInCourses: [],
  };

  presetsThisWork: string[] = [];

  oneWork: OneWorkResponseT = this._defaultOneWork;

  editingEntity: HomeworkViewModel = this._defaultValue();

  constructor() {
    super();
    makeObservable(this, {
      editingEntity: observable,
      entities: observable,
      isDialogOpen: observable,
      oneWork: observable,
      presetsThisWork: observable,
    });
  }

  // openDialog = async (editingEntity?: HomeworkViewModel, workId?: string) => {
  openDialog = async (workId?: string) => {
    try {
      this.oneWork = workId
        ? (this.oneWork = await worksService.getOneWork(workId))
        : this._defaultOneWork;
      this.presetsThisWork = this.oneWork.work.gamePresets
        ? this.oneWork.work.gamePresets?.map(pr => pr.gamePreset.id)
        : ([] as string[]);
      // this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
      this.isDialogOpen = true;
    } catch (e) {
      console.warn(e);
    }
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  list = async (status?: string, perPage?: number, type?: string) =>
    this.execute(async () => {
      const paginationResponse = await this._repository.list(
        this.pagination.page,
        status,
        perPage,
        type,
      );

      this.entities = paginationResponse.items;
      this.pagination = {
        page: paginationResponse.page,
        rowsPerPage: paginationResponse.perPage,
        total: paginationResponse.total,
      };
    });

  addOrEdit = async () => {
    this.closeDialog();

    this.execute(async () => {
      const params: CreatOrEditWorkRequestT = {
        id: this.oneWork?.work?.id,
        title: this.oneWork?.work.title,
        text: this.oneWork?.work.text,
        type: this.oneWork?.work.type,
        gamePresets: this.presetsThisWork,
        status: this.oneWork.work.status,
      };
      await this._repository.addOrEdit(params);
      await this.pull();
    });
  };

  remove = async (id: string) => {
    this.execute(async () => {
      await this._repository.remove(id);
      await this.pull();
    });
  };

  pull = async (status?: string, perPage?: number, type?: string) => {
    this.execute(async () => this.list(status, perPage, type));
  };

  changePage = async (page: number) => {
    console.log(page);
    this.pagination.page = page;
    this.execute(async () => this.list());
  };

  get validateSchema() {
    return yup.object<Record<keyof HomeworkViewModel, any>>().shape({
      title: yup.string().required('*'),
      text: yup.string().required('*'),
      status: yup.string().required('*'),
    });
  }
}
