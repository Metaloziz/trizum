import { WorkTypes } from 'app/enums/WorkTypes';
import worksService from 'app/services/worksService';

import { StoreBase } from 'app/stores/StoreBase';
import { CreatOrEditWorkRequestT, OneWorkResponseT } from 'app/types/WorkTypes';
import { HomeworkViewModel } from 'app/viewModels/HomeworkViewModel';
import { makeObservable, observable, runInAction } from 'mobx';
import * as yup from 'yup';
import { MIN_NAMES_LENGTH } from 'constants/constants';
import { removeEmptyFields, throwErrorMessage } from 'utils';
import { StatusTypes } from '../enums/StatusTypes';
import homeWorksService from '../services/homeWorksService';
import { PaginationType } from '../types/PaginationType';
import { SearchParamsType } from '../types/SearchParamsType';

class HomeworkStore extends StoreBase {
  isDialogOpen: boolean = false;

  worksArray: HomeworkViewModel[] = [];

  private searchHomeWorksParams: SearchParamsType = {
    page: 0,
    per_page: 10,
    total: 0,
    status: '',
    type: '',
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
      throwErrorMessage(e);
    }
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  getHomeWorks = async () =>
    this.execute(async () => {
      const params = removeEmptyFields(this.searchHomeWorksParams);

      const paginationResponse = await homeWorksService.getHomeWorks(params);

      runInAction(() => {
        this.worksArray = paginationResponse.items;
        this.searchHomeWorksParams = {
          ...this.searchHomeWorksParams,
          page: paginationResponse.page,
          per_page: paginationResponse.perPage,
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
      throwErrorMessage(e);
    }
  };

  remove = async (id: string, status: StatusTypes) => {
    try {
      this.execute(async () => {
        await homeWorksService.addOrEditWork({ id, status });
        await this.getHomeWorks();
      });
    } catch (e) {
      throwErrorMessage(e);
    }
  };

  setSearchParams = (params: Partial<SearchParamsType>) => {
    this.searchHomeWorksParams = { ...this.searchHomeWorksParams, ...params };
  };

  clearSearchParams = () => {
    this.searchHomeWorksParams = { page: 0, per_page: 10, total: 1, type: '', status: '' };
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

  get pagination(): PaginationType {
    return {
      page: this.searchHomeWorksParams.page,
      per_page: this.searchHomeWorksParams.per_page,
      total: Math.ceil(this.searchHomeWorksParams.total / this.searchHomeWorksParams.per_page),
    };
  }
}

export default new HomeworkStore();
