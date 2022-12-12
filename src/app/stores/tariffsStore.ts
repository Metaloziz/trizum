import { makeAutoObservable, runInAction } from 'mobx';

import tariffsService from 'app/services/tafiffService';
import { TariffsEditOrCreateT, TariffsType } from 'app/types/TariffTypes';
import { getDateWithoutTime } from 'components/rate-choice/utils';
import { throwErrorMessage } from 'utils';

class TariffsStore {
  tariff = {
    code: '',
    description: '',
    durationMonths: 0,
    endedAt: {
      date: '',
      timezone: '',
      timezone_type: 0,
    },
    forFirstPay: false,
    forNewClient: false,
    forSecondChild: true,
    id: '',
    name: '',
    newPrice: '',
    oldPrice: '',
    prevTariff: null as number | null,
    startedAt: {
      date: '',
      timezone: '',
      timezone_type: 0,
    },
    status: 'active',
  };

  tariffs: TariffsType[] = [];

  isDialogOpen: boolean = false;

  filters = {
    status: 'active',
    lengthFrom: '',
    lengthTo: '',
    dateFrom: '',
    dateTo: '',
    input: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  openDialog = (editingEntity?: TariffsType) => {
    this.tariff = editingEntity ? { ...editingEntity } : this.tariff;
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
    this.tariff = {
      code: '',
      description: '',
      durationMonths: 0,
      endedAt: {
        date: '',
        timezone: '',
        timezone_type: 0,
      },
      forFirstPay: false,
      forNewClient: false,
      forSecondChild: true,
      id: '',
      name: '',
      newPrice: '',
      oldPrice: '',
      prevTariff: null as number | null,
      startedAt: {
        date: '',
        timezone: '',
        timezone_type: 0,
      },
      status: 'active',
    };
  };

  setFilters = (filter: any) => {
    this.filters = { ...filter };
  };

  addOrEdit = async (options: TariffsEditOrCreateT) => {
    try {
      if (this.tariff.id) {
        await tariffsService.edit(this.tariff.id, options);
      } else {
        await tariffsService.create(options);
      }
    } catch (e) {
      throwErrorMessage(e);
    }
    this.closeDialog();
    await this.getTariffs();
  };

  getTariffs = async () => {
    try {
      const res = await tariffsService.getAllTariffs();
      runInAction(() => {
        this.tariffs = res;
      });
      return res;
    } catch (e) {
      throwErrorMessage(e);
    }
    return undefined;
  };

  get filteredTariffs() {
    let data: TariffsType[] = [...this.tariffs];
    if (this.filters.lengthFrom) {
      data = data.filter(val => +val.newPrice >= +this.filters.lengthFrom);
    }
    if (this.filters.lengthTo) {
      data = data.filter(val => +val.newPrice <= +this.filters.lengthTo);
    }
    if (this.filters.dateFrom) {
      data = data.filter(
        val =>
          getDateWithoutTime(new Date(val.startedAt.date)) >=
          getDateWithoutTime(new Date(this.filters.dateFrom)),
      );
    }
    if (this.filters.dateTo) {
      data = data.filter(
        val =>
          getDateWithoutTime(new Date(val.endedAt.date)) <=
          getDateWithoutTime(new Date(this.filters.dateTo)),
      );
    }
    if (this.filters.input) {
      if (Number(this.filters.input)) {
        data = data.filter(val => val.code.includes(this.filters.input));
      } else {
        data = data.filter(val =>
          val.name.toLowerCase().includes(this.filters.input.toLowerCase()),
        );
      }
    }
    if (this.filters.status) {
      if (this.filters.status === 'all') {
        return data;
      }
      data = data.filter(val => val.status === this.filters.status);
    }
    return data;
  }
}

export default new TariffsStore();
