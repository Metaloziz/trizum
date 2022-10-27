import worksService from 'app/services/worksService';
import { StoreBase } from 'app/stores/StoreBase';
import { RequestCreateWork, OneWorkResponseT } from 'app/types/WorkTypes';
import { runInAction, makeObservable, observable } from 'mobx';

class WorksStore extends StoreBase {
  currentHomework?: OneWorkResponseT;

  constructor() {
    super();
    makeObservable(this, {
      currentHomework: observable,
    });
  }

  getCurrentWork = (workId: string) => {
    this.execute(async () => {
      const responce = await worksService.getOneWork(workId);

      runInAction(() => {
        this.currentHomework = responce;
      });
    });
  };

  setCurrentWork = (work?: OneWorkResponseT) => {
    this.currentHomework = work;
  };

  createHomework = async (work: RequestCreateWork) => {
    try {
      await worksService.createWork(work);
    } catch (e) {
      console.warn(e);
    }
  };

  editHomework = async (work: RequestCreateWork, id: string) => {
    try {
      await worksService.editWork(work, id);
    } catch (e) {
      console.warn(e);
    }
  };
}
export default new WorksStore();
