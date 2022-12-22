import reportService from 'app/services/reportService';
import { ReportItemsT, ReportParamsForUI } from 'app/types/ReportT';
import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError } from 'axios';
import { throwErrorMessage } from 'utils';
import { ResponseGroups } from '../types/GroupTypes';

class ReportStore {
  items: ReportItemsT[] = [];

  groups: ResponseGroups[] = [];

  page: number = 0;

  perPage: number = 10;

  total: number = 1;

  isLoad: boolean = false;

  private queryDefaultValues: ReportParamsForUI = {
    perPage: 10,
    page: 0,
    cityName: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    is_active: '',
    is_payed: '',
    date_since: '',
    date_until: '',
    tariff_id: '',
    franchise_id: '',
    group_id: '',
  };

  _queryFields = { ...this.queryDefaultValues };

  constructor() {
    makeAutoObservable(this);
  }

  execute = async <T>(action: () => Promise<T>) => {
    try {
      this.isLoad = true;
      return await action();
    } catch (e) {
      // TODO: handle error
      return (e as AxiosError).message;
    } finally {
      this.isLoad = false;
    }
  };

  getReports = async () => {
    try {
      const res = await reportService.getReports(this._queryFields);
      runInAction(() => {
        this.items = res.items;
        this.page = res.page;
        this.perPage = res.perPage;
        this.total = res.total;
      });
    } catch (e) {
      throwErrorMessage(e);
    }
  };

  clearQueryFieldsWithRequest = () => {
    this._queryFields = { ...this.queryDefaultValues };
    this.getReports();
  };

  cleanQueryFieldsWithoutRequest = () => {
    this._queryFields = { ...this.queryDefaultValues };
  };

  get reports() {
    return this.items;
  }

  get queryFields() {
    return this._queryFields;
  }
}

export default new ReportStore();
