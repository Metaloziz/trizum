import { makeAutoObservable, runInAction } from 'mobx';

import franchiseService from 'app/services/franchiseService';
import { FranchisingViewModel } from 'app/viewModels/FranchisingViewModel';

class FranchiseeStore {
  franchise: FranchisingViewModel[] = [
    {
      id: '',
      shortName: '',
      // fullName: '',
      inn: '',
      legalAddress: '',
      actualAddress: '',
      schoolName: '',
      ogrn: '',
      kpp: '',
      checkingAccount: '',
      phone: 0,
      email: '',
      city: '',
      bankBill: '',
      bankName: '',
      bankBik: '',
      bankInn: '',
      bankKpp: '',
    },
  ];

  oneFranchise: FranchisingViewModel = {
    id: '',
    shortName: '',
    // fullName: '',
    inn: '',
    legalAddress: '',
    actualAddress: '',
    schoolName: '',
    ogrn: '',
    kpp: '',
    checkingAccount: '',
    phone: 0,
    email: '',
    city: '',
    bankBill: '',
    bankName: '',
    bankBik: '',
    bankInn: '',
    bankKpp: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  getFranchisee = async () => {
    try {
      const res = await franchiseService.getAll();
      runInAction(() => {
        this.franchise = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return [] as FranchisingViewModel[];
  };

  getOneFranchisee = async (id: string) => {
    try {
      const res = await franchiseService.getOne(id);
      runInAction(() => {
        this.oneFranchise = res;
      });
      return res;
    } catch (e) {
      console.warn(e);
    }
    return [] as FranchisingViewModel[];
  };
}

export default new FranchiseeStore();
