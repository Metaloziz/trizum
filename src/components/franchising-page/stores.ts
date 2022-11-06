import { makeObservable, observable, runInAction } from 'mobx';
import * as yup from 'yup';

import { FranchisingFilterViewModel } from './models/FranchisingFilterViewModel';

import { StoreBase } from 'app/stores/StoreBase';
import { Nullable } from 'app/types/Nullable';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';
import { FranchisingRepository } from 'components/franchising-page/repositories';

import { innValidation } from 'utils/innValidation';
import { orgnValidation } from 'utils/orgnValidation';
import { kppValidation } from 'utils/kppValidation';
import { isUniquePhone } from 'components/franchising-page/helpers/isUniquePhone';
import { isUniqueInn } from 'components/franchising-page/helpers/isUniqueInn';
import { isUniqueCheckingAccount } from 'components/franchising-page/helpers/isUniqueCheckingAccount';

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

  editingEntityId: string = '';

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
    this.editingEntityId = editingEntity && editingEntity?.id ? editingEntity?.id : '';
  };

  closeDialog = () => {
    this.editingEntityId = '';
    this.isDialogOpen = false;
  };

  list = async () => {
    this.execute(async () => {
      const res = await this._repository.list();

      runInAction(() => {
        this.entities = res;
      });
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
      shortName: yup.string().min(3).max(30).required('*'),
      inn: yup
        .number()
        .test('innValid', 'Неверный ИНН', value => innValidation(value as number))
        .test('isUniqueInn', 'Не уникальный ИНН', value => isUniqueInn(value as number))
        .required(),
      phone: yup
        .number()
        .test('isUnique', 'Банковский счет', value => isUniquePhone(value as number))
        .required('*')
        .required('*'),
      email: yup.string().email().required('*'),
      legalAddress: yup.string().max(200).required('*'),
      actualAddress: yup.string().max(200).required('*'),
      kpp: yup.string(),
      ogrn: yup
        .number()
        .test('orgnValid', 'Неверный ИНН', value => orgnValidation(value as number))
        .required(),
      city: yup.string().max(30).required('*'),
      schoolName: yup.string().max(120).required('*'),
      bankName: yup.string().max(30).required('*'),
      bankBik: yup.string().length(9).required('*'),
      bankInn: yup
        .number()
        .test('innValid', 'Неверный ИНН', value => innValidation(value as number))
        .required(),
      bankKpp: yup
        .string()
        .test('innValid', 'Неверный KПП', value => kppValidation(value as string))
        .required('*'),
      bankBill: yup.string().length(20).required('*'),
      checkingAccount: yup
        .string()
        .max(20)
        .test('isUnique', 'Банковский счет', value => isUniqueCheckingAccount(value as string))
        .required('*')
        .required('*'),
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
