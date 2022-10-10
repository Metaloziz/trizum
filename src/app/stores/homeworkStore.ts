import { WorkTypes } from 'app/enums/WorkTypes';
import worksService from 'app/services/worksService';

import { StoreBase } from 'app/stores/StoreBase';
import { CreatOrEditWorkRequestT, OneWorkResponseT } from 'app/types/WorkTypes';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';
import { makeObservable, observable, runInAction } from 'mobx';
import * as yup from 'yup';
import { MAX_NAMES_LENGTH, MIN_NAMES_LENGTH } from '../../constants/constants';
import { StatusTypes } from '../enums/StatusTypes';
import homeWorksService from '../services/homeWorksService';
import { PaginationResponse } from '../types/PaginationResponse';

type PaginationType = Omit<PaginationResponse<any>, 'items'>;

class HomeworkStore extends StoreBase {
  isDialogOpen: boolean = false;

  worksArray: HomeworkViewModel[] = [];

  pagination: PaginationType = {
    page: 0,
    perPage: 10,
    total: 0,
  };

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

  constructor() {
    super();
    makeObservable(this, {
      worksArray: observable,
      isDialogOpen: observable,
      oneWork: observable,
      presetsThisWork: observable,
      pagination: observable,
    });
  }

  openDialog = async (workId?: string) => {
    try {
      runInAction(async () => {
        this.oneWork = workId
          ? (this.oneWork = await worksService.getOneWork(workId))
          : this._defaultOneWork;
        this.presetsThisWork = this.oneWork.work.gamePresets
          ? this.oneWork.work.gamePresets?.map(pr => pr.gamePreset.id)
          : ([] as string[]);
      });
      this.isDialogOpen = true;
    } catch (e) {
      console.warn(e);
    }
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  getHomeWorks = async (status?: string, perPage?: number, type?: string) =>
    this.execute(async () => {
      const paginationResponse = await homeWorksService.getHomeWorks(
        this.pagination.page,
        status,
        this.pagination.perPage,
        type,
      );

      runInAction(() => {
        this.worksArray = paginationResponse.items;
        this.pagination = {
          page: paginationResponse.page,
          perPage: paginationResponse.perPage,
          total: paginationResponse.total,
        };
      });
    });

  addOrEdit = async () => {
    this.closeDialog();
    try {
      this.execute(async () => {
        const params: CreatOrEditWorkRequestT = {
          id: this.oneWork?.work?.id,
          title: this.oneWork?.work.title,
          text: this.oneWork?.work.text,
          type: this.oneWork?.work.type,
          gamePresets: this.presetsThisWork,
          status: this.oneWork.work.status,
        };
        await homeWorksService.addOrEditWork(params);
        await this.getHomeWorks();
      });
    } catch (e) {
      console.warn(e);
    }
  };

  remove = async (id: string, status: StatusTypes) => {
    try {
      this.execute(async () => {
        await homeWorksService.addOrEditWork({ id, status });
        await this.getHomeWorks();
      });
    } catch (e) {
      console.warn(e);
    }
  };

  changePage = async (page: number) => {
    this.pagination.page = page;
    this.execute(async () => this.getHomeWorks());
  };

  setSearchParams = (params: Partial<PaginationType>) => {
    this.pagination = { ...this.pagination, ...params };
  };

  clearSearchParams = () => {
    this.pagination = { page: 0, perPage: 5, total: 1 };
  };

  setSuccess = (value: boolean | null) => {
    this.success = value;
  };

  setError = (value: Error | null) => {
    this.error = value;
  };

  get validateSchema() {
    return yup.object<Record<keyof HomeworkViewModel, any>>().shape({
      title: yup
        .string()
        .required('*')
        .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      text: yup
        .string()
        .required('*')
        .min(MIN_NAMES_LENGTH, `Минимальная длинна ${MIN_NAMES_LENGTH} символа`),
      status: yup.string().required('*'),
    });
  }
}

export default new HomeworkStore();
