import { makeObservable, observable, toJS } from 'mobx';
import * as yup from 'yup';

import { FranchisingFilterViewModel } from './models/FranchisingFilterViewModel';

import { StoreBase } from 'app/stores/StoreBase';
import { Nullable } from 'app/types/Nullable';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { FranchisingRepository } from 'components/franchising-page/repositories';
import _ from 'lodash';

export class FranchisingStore extends StoreBase {
  private _repository = new FranchisingRepository();

  private _defaultValue = (): FranchisingViewModel => ({
    actualAddress: '',
    bankBik: '',
    bankBill: '',
    bankInn: '',
    bankKpp: '',
    bankName: '',
    email: '',
    // fullName: '',
    shortName: '',
    schoolName: '',
    ogrn: '',
    kpp: '',
    legalAddress: '',
    phone: null!,
    inn: '',
    city: '',
    checkingAccount: '',
  });

  editingEntity: FranchisingViewModel = this._defaultValue();

  entities: FranchisingViewModel[] = [];

  isDialogOpen: boolean = false;

  filter: Nullable<FranchisingFilterViewModel> = null;

  constructor() {
    super();

    makeObservable(this, {
      editingEntity: observable,
      entities: observable,
      isDialogOpen: observable,
      filter: observable,
    });
  }

  openDialog = (editingEntity?: FranchisingViewModel) => {
    this.editingEntity = editingEntity ? { ...editingEntity } : this._defaultValue();
    this.isDialogOpen = true;
  };

  closeDialog = () => {
    this.isDialogOpen = false;
  };

  list = async () => {
    this.execute(async () => {
      this.entities = await this._repository.list();
    });
  };

  getById = async (id: string) => {
    this.execute(async () => {
      const entity = await this._repository.byId(id);
    });
  };

  addOrEdit = async () => {
    this.closeDialog();

    this.execute(async () => {
      await this._repository.addOrEdit(this.editingEntity);
      await this.pull();
      console.log(toJS(this.editingEntity));
    });
  };

  remove = async (id: string) => {
    this.execute(async () => {
      await this._repository.remove(id);
      await this.pull();
    });
  };

  pull = async () => {
    this.execute(async () => this.list());
  };

  onChangePhone = (value: string) => {
    this.editingEntity.phone = !value ? null! : parseInt(value.replace(/\D/g, ''), 10);
  };

  onChangeFilter = (filter: Nullable<FranchisingFilterViewModel>) => {
    this.filter = filter;
  };

  get validateSchema() {
    return yup.object<Record<keyof FranchisingViewModel, any>>().shape({
      // fullName: yup.string().required('*'),
      shortName: yup.string().required('*'),
      inn: yup.string().min(10).max(12).required('*'),
      phone: yup.number().required('*'),
      email: yup.string().email().required('*'),
      legalAddress: yup.string().required('*'),
      actualAddress: yup.string().required('*'),
      kpp: yup.string().min(9).max(9).required('*'),
      ogrn: yup.string().min(13).max(15).required('*'),
      city: yup.string().required('*'),
      schoolName: yup.string().required('*'),
      bankName: yup.string().required('*'),
      bankBik: yup.string().required('*'),
      bankInn: yup.string().min(10).max(12).required('*'),
      bankKpp: yup.string().min(9).max(9).required('*'),
      bankBill: yup.string().required('*'),
      checkingAccount: yup.string().required('*'),
    });
  }

  get filteredEntities() {
    if (!this.filter) {
      return this.entities;
    }

    let result: FranchisingViewModel[] = this.entities;

    if (this.filter.shortName.trim() && result.length) {
      result = result.filter(entity =>
        (entity.shortName ?? '')
          .toLowerCase()
          .includes(this.filter!.shortName.trim().toLowerCase()),
      );
    }

    if (this.filter.inn.trim() && result.length) {
      result = result.filter(entity =>
        (entity.inn ?? '').toLowerCase().includes(this.filter!.inn.toLowerCase()),
      );
    }

    if (this.filter.email.trim() && result.length) {
      result = result.filter(entity =>
        (entity.email ?? '').toLowerCase().includes(this.filter!.email.toLowerCase()),
      );
    }

    if (this.filter.city.trim() && result.length) {
      result = result.filter(entity =>
        (entity.city ?? '').toLowerCase().includes(this.filter!.city.toLowerCase()),
      );
    }

    if (this.filter.checkingAccount.trim() && result.length) {
      result = result.filter(entity =>
        (entity.checkingAccount ?? '')
          .toLowerCase()
          .includes(this.filter!.checkingAccount.toLowerCase()),
      );
    }

    if (this.filter.phone && result.length) {
      result = result.filter(entity =>
        (entity.phone?.toString() ?? '').includes(this.filter!.phone.toString()),
      );
    }

    return result;
  }
}
